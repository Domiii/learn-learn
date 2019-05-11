import FirestoreContainer from "unstated-ext/FirestoreContainer";


export default class Checks extends FirestoreContainer {
  get values() {
    return {

    };
  }

  get queries() {
    return {
      checksByUser: (uid) => {
        return this.collection.where('creatorUid', '===', uid);
      }
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