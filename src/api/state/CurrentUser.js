import { db } from 'api/firebase';
import auth, { onAuthStateChanged } from '../auth';

import eq from 'lodash/eq';

import { Container } from 'unstated';

function selectPublic(data) {
  const {
    displayName,
    photoURL
  } = data;
  return {
    displayName,
    photoURL
  };
}
function selectPrivate(data) {
  const {
    email
  } = data;
  return {
    email
  };
}

export default class CurrentUser extends Container {
  state = {};

  _onUser = user => {
    if (user) {
      db.collection('usersPrivate').doc(user.uid).onSnapshot(snap => {
        const priv = selectPrivate(user);
        if (!snap.exists || !eq(priv, selectPrivate(snap.data()))) {
          // update private user data
          db.collection('usersPrivate').doc(user.uid).set(priv);
        }
        this.setState({private: snap.data()});
      });

      db.collection('usersPublic').doc(user.uid).onSnapshot(snap => {
        const pub = selectPublic(user);
        if (!snap.exists || !eq(pub, selectPublic(snap.data()))) {
          // update public user data
          db.collection('usersPublic').doc(user.uid).set(pub);
        }
        this.setState({public: snap.data()});
      });
    }
  };

  constructor() {
    super();

    //console.log('CurrentUser', auth.currentUser);
    this.state.value = auth.currentUser;
    onAuthStateChanged(user => {
      this._onUser(user);
      //console.log('onAuthStateChanged CurrentUser', user);
      this.setState({ value: user });
    });
  }

  get value() {
    return this.state.value;
  }
}