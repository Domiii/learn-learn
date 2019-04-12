import { db } from 'api/firebase';

import NotLoaded from 'NotLoaded';

import { Container } from 'unstated';

export default class Users extends Container {
  static n = 'users';
  state = {
    setRole: async (uid, role) => {
      const userDoc = db.collection('usersPublic').doc(uid);
      const user = await userDoc.get();
      const userData = user.data();
      //let { displayRole } = userData;

      userDoc.update({
        role,
        displayRole: role
      });
    }
  };

  constructor() {
    super();

    this.state.allUsers = NotLoaded;
    db.collection('usersPublic').onSnapshot(snap => {
      this.setState({
        allUsers: snap.docs.map(d =>
          Object.assign({},
            d.data(),
            { uid: d.id }))
      });
    });
  }
}