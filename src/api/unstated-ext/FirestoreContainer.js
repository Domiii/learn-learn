import zipObject from 'lodash/zipObject';

import {
  db
} from 'api/firebase';
import NotLoaded from 'NotLoaded';

import ContainerEx from './ContainerEx';
import isObject from 'lodash/isObject';
import isFunction from 'lodash/isFunction';


export default class FirestoreContainer extends ContainerEx {
  _registered = new Map();

  constructor() {
    super();

    let collectionName;
    if (this.constructor.n) {
      // collection name is also the default container name
      collectionName = this.constructor.n;
    } else {
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

  get db() {
    return db;
  }

  doc = id => {
    return this.collection.doc(id);
  }

  registerValues = (config) => {
    const _originalState = this.state || {};
    for (let name in config) {
      let {
        ref,
        map: mapFn,
        mergeRoot
      } = config[name];

      if (!ref) {
        throw new Error(`ref was not provided in ${this}.values.${name}`);
      }

      if (mapFn) {
        mapFn = mapFn.bind(this);
      }
      if (mergeRoot) {
        mergeRoot = mergeRoot.bind(this);
      }

      const registration = {
        ref,
        mapFn,
        mergeRoot
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
                //const oldState = this.state[name];
                result = await mapFn(snap);
              } else {
                result = snap;
              }

              // set state for given path
              this.setState({
                [name]: result
              });

              if (mergeRoot) {
                // merge back into root
                const res = await mergeRoot(snap, name, ref);
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
    this.state = _originalState;
  }

  _updateQueryCache(name, argsPath, result) {
    this.setState(({
      _queryStates
    }) => {
      const queryState = _queryStates[name];
      queryState[argsPath] = result;
      return {
        _queryStates
      };
    });
  }

  _queryRead = (registration, ...args) => {
    const {
      name,
      query
    } = registration;
    const {
      _queryStates
    } = this.state;

    // make sure, args kinda check out.
    args.forEach(arg => {
      if (isObject(arg) || isFunction(arg)) {
        throw new Error(`Invalid call to Firestore query in ${this}: arguments must all be primitives: ` + JSON.stringify(args));
      }
    });

    const queryState = _queryStates[name];
    const argsPath = JSON.stringify(args);

    if (!queryState.loadStatus[argsPath]) {
      // first time -> initialize query
      queryState.loadStatus[argsPath] = true;

      const {
        mapFn
      } = registration;

      const ref = query(...args);

      const unsub = ref.onSnapshot(async snap => {
        let result;
        if (mapFn) {
          result = await mapFn(snap, ...args);
        } else {
          result = snap;
        }

        this._updateQueryCache(name, argsPath, result);
      });

      // TODO: when unsubbing, also need to reset loadStatus (+ cache)
      registration.unsub = unsub;
    }
    return queryState.cache[argsPath];
  }

  registerQueries = config => {
    const _queryStates = {};
    for (let name in config) {
      let {
        query,
        map: mapFn,
        mergeRoot
      } = config[name];

      if (mapFn) {
        mapFn = mapFn.bind(this);
      }
      if (mergeRoot) {
        mergeRoot = mergeRoot.bind(this);
      }
      // make sure, query is a function
      if (!isFunction(query)) {
        throw new Error(`Invalid query entry: ${this}.queries.${name}.query is not (but must be) function.`);
      }
      query = query.bind(this);

      const registration = {
        name,
        query,
        mapFn,
        mergeRoot
      };

      // register
      this._registered.set(name, registration);

      // the actual query will be registered as the queryRead function on the given registration
      Object.assign(this.state, {
        [name]: this._queryRead.bind(this, registration)
      });

      _queryStates[name] = {
        cache: {},
        loadStatus: {}
      };
    }

    Object.assign(this.state, {
      // cache is used by queries
      _queryStates
    });
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

  toString = () => {
    return this.constructor.n || this.constructor.name;
  }
}