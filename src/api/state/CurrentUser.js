import auth, { onAuthStateChanged } from '../auth';

import { Container } from 'unstated';

export default class CurrentUser extends Container {
  state = {};

  constructor() {
    super();

    //console.log(auth.currentUser);
    //this.setState({ value: auth.currentUser });
    onAuthStateChanged(user => {
      //console.log('onAuthStateChanged', user);
      this.setState({ value: user });
    });
  }

  get value() {
    return this.state.value;
  }
}