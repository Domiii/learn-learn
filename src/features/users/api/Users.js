import zipObject from 'lodash/zipObject';

import { db } from 'api/firebase';

import NotLoaded from 'NotLoaded';

import { Container } from 'unstated';
import FirestoreContainer from 'unstated-ext/FirestoreContainer';

class Users extends FirestoreContainer {
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
      userById: this.doc
    };
  }

  get selectors() {
    return {
      getUser(uid) {
        const user = this.userById(uid);
        if (user === NotLoaded) {
          return NotLoaded;
        }
        return user;
      },
      getUserName(uid) {
        const user = this.userById(uid);
        if (user === NotLoaded) {
          return NotLoaded;
        }
        return user.displayName;
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

export default Users;