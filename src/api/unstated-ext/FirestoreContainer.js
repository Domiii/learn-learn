import zipObject from 'lodash/zipObject';

import { db } from 'api/firebase';
import NotLoaded from 'NotLoaded';


export default class FirestoreContainer extends ContainerEx {
  _registered = new Map();

  container(collectionName) {
    super();

    if (!this.constructor.n) {
      // collection name is also the default container name
      this.constructor.n = collectionName;
    }

    this.collectionName = collectionName;
    this.collection = db.collection(collectionName);

    const {
      values, 
      queries
    } = this;
    if (values) {
      this.registerValues(values);
    }
    if (queries) {
      this.registerQueries(queries);
    }
  }

  registerValues = (config) => {
    const _originalState = this.state;
    for (let name in config) {
      const {ref, map: mapFn} = config[name];
      const registration = {
        ref, mapFn
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
                result = await map(snap, oldState, ref, name);
              }
              else {
                result = snap;
              }

              // store result
              this.setState({ [name]: result });
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