import RoleId from 'api/roles';
import auth, { onAuthStateChanged } from '../auth';
import NotLoaded from 'NotLoaded';

import zipObject from 'lodash/zipObject';

import FirestoreContainer from 'unstated-ext/FirestoreContainer';


export default class Learners extends FirestoreContainer {
  static n = 'learners';

  get actions() {
    return {
      updateA: (id, a) => {
        const upd = { a };
        return this.doc(id).update(upd);
      },
    };
  }

  get values() {
    return {
      all: {
        ref: this.collection
      }
    };
  }

  get queries() {
    return {
      byId: {
        query: this.doc
      }
    };
  }
}