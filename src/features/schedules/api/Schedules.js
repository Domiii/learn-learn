import Firebase from 'firebase/app';
import FirestoreContainer from "unstated-ext/FirestoreContainer";
import NotLoaded from 'NotLoaded';

import Users from 'features/users/api/Users';
import CurrentUser from 'api/state/CurrentUser';
import sleep from '../../../util/sleep';

const MergeTrue = Object.freeze({ merge: true });
const EmptyArray = Object.freeze([]);
const EmptyObject = Object.freeze({});


class Schedules extends FirestoreContainer {
  static n = 'schedules';

  get refs() {
    return {

    }
  }

  get values() {
    return {
      all: { ref: this.collection }
    };
  }

  get queries() {
    return {
      
    };
  }

  get selectors() {
    return {

    };
  }

  get actions() {
    return {

    };
  }
}

export default Schedules;