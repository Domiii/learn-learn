import zipObject from 'lodash/zipObject';

import { db } from 'api/firebase';

import NotLoaded from 'NotLoaded';

import { Container } from 'unstated';
import { FirestoreContainer } from '../unstated-ext/FirestoreContainers';

export default class Users extends FirestoreContainer {
  static n = 'users';

  get values() {
    return {
      all: {
        ref: this.collection,
        map: snap => {
          const uids = snap.docs.map(d => d.id);
          const list = snap.docs.map(d =>
            Object.assign({ uid: d.id }, d.data())
          );
          return {
            list,
            byUid: zipObject(uids, list)
          };
        }
      }
    }
  }

  get queries() {
    return {
    };
  }

  get selectors() {
    return {
      getUser(uid) {
        if (this.state.allUsers === NotLoaded) {
          return NotLoaded;
        }
        return this.state.allUsers;
      }
    };
  }

  get actions() {
    return {
      async setRole(uid, role) {
        return this.doc(uid).update({
          role,
          displayRole: role
        });
      }
    };
  }
}