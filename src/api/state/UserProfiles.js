import { db } from 'api/firebase';

import { Container } from 'unstated';

export default class UserProfiles extends Container {
  state = {};

  constructor() {
    super();

    this.state.value = [];
    db.collection('usersPublic').onSnapshot(snap => {
      this.setState({ value: snap.docs.map(d => d.data()) });
    });
  }

  get value() {
    return this.state.value;
  }
}