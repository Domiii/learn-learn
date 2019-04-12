import zipObject from 'lodash/zipObject';

import { db } from 'api/firebase';
import NotLoaded from 'NotLoaded';

import ContainerEx from './ContainerEx';


export default class FirestoreContainer extends ContainerEx {
  _registered = new Map();

  constructor() {
    super();

    let collectionName;
    if (this.constructor.n) {
      // collection name is also the default container name
      collectionName = this.constructor.n;
    }
    else {
      throw new Error('FirestoreContainer must define static property `n` (short for `name`): ' + this.constructor.name);
    }

    this.collectionName = collectionName;
    this.collection = db.collection(collectionName);

    const {
      actions,
      values, 
      queries
    } = this;

    if (actions) {
      // merge actions into `state` as well as into `this`
      this.state = Object.assign(this.state, actions);
      Object.assign(this, actions);
    }

    if (values) {
      this.registerValues(values);
    }
    if (queries) {
      this.registerQueries(queries);
    }
  }

  registerValues = (config) => {
    const _originalState = this.state || {};
    for (let name in config) {
      const {ref, map: mapFn, mergeRoot: mergeFn} = config[name];
      const registration = {
        ref, mapFn, mergeFn
      };

      // register
      this._registered.set(name, registration);

      // register a proxy call
      Object.defineProperties(_originalState, {
        [name]: {
          get: () => {
            // the first time we access this query, register a listener
            registration.unsub = ref.onSnapshot(async snap => {
              let result;
              if (mapFn) {
                const oldState = this.state[name];
                result = await mapFn(snap, oldState, ref, name);
              }
              else {
                result = snap;
              }

              // set state for given path
              this.setState({ [name]: result });

              if (mergeFn) {
                // merge back into root
                const res = await mergeFn(snap, ref, name);
                this.setState(res);
              }
            });

            // override the proxy call
            this.setState({
              [name]: NotLoaded
            });
            return NotLoaded;
          },
          configurable: true,
          enumerable: true
        }
      });
    }
    this.setState(_originalState);
  }

  doc = id => {
    return this.collection.doc(id);
  }

  /**
   * Takes all documents of QuerySnapshot and converts to an object, 
   * mapping id to data().
   */
  snapToById = snap => {
    const ids = snap.docs.map(d => d.id);
    const data = snap.docs.map(d => d.data());
    return zipObject(ids, data);
  }
}