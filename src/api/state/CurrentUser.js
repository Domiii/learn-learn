import Firebase from 'firebase/app';
import { db } from 'api/firebase';
import RoleId from 'api/roles';
import auth, { onAuthStateChanged } from '../auth';

import isEqual from 'lodash/isEqual';

import { Container } from 'unstated';

function selectPrivate(data) {
  const {
    email
  } = data;
  return {
    email
  };
}
function selectPublic(data) {
  const {
    displayName,
    photoURL,
    // role,
    // displayRole
  } = data;
  return {
    displayName,
    photoURL,
    // role: role || null,
    // displayRole: displayRole || null
  };
}

function needsUpdate(snap, current, sel) {
  //return !snap.exists || !isEqual(priv, sel(snapData));
  return !snap.exists;
}

export default class CurrentUser extends Container {
  state = {
    ...auth.currentUser,
    setDisplayRole: displayRole => {
      if (!(displayRole <= this.state.role)) {
        return;
      }
      db.collection('usersPublic').doc(this.state.uid).update({
        displayRole
      });
    }
  };

  _onUser = user => {
    if (user) {
      db.collection('usersPrivate').doc(user.uid).onSnapshot(snap => {
        const priv = selectPrivate(user);
        const snapData = snap.data() || {};
        if (needsUpdate(snap, priv, selectPrivate)) {
          // update private user data
          const obj = priv;
          obj.updatedAt = Firebase.firestore.FieldValue.serverTimestamp();
          if (!snap.exists) {
            obj.createdAt = Firebase.firestore.FieldValue.serverTimestamp();
          }
          db.collection('usersPrivate').doc(user.uid).set(obj, {merge: true});
        }
        this.setState(snapData);
      });

      db.collection('usersPublic').doc(user.uid).onSnapshot(snap => {
        const pub = selectPublic(user);
        const snapData = snap.data() || {};
        if (needsUpdate(snap, pub, selectPublic)) {
          // update public user data
          //debugger;
          const obj = pub;
          obj.updatedAt = Firebase.firestore.FieldValue.serverTimestamp();
          if (!snap.exists) {
            obj.createdAt = Firebase.firestore.FieldValue.serverTimestamp();
          }
          db.collection('usersPublic').doc(user.uid).set(obj, {merge: true});
        }
        if (!snapData.displayRole) {
          snapData.displayRole = RoleId.Guest;
        }
        this.setState(snapData);
      });
    }
  };

  constructor() {
    super();

    //console.log('CurrentUser', this.state);
    onAuthStateChanged(user => {
      this._onUser(user);
      //console.log('onAuthStateChanged CurrentUser', user);
      this.setState(user);
    });
  }
}