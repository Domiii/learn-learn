import FirestoreContainer from "unstated-ext/FirestoreContainer";

// TODO: use SurveyJs to edit, build and save CheckLists
export default class CheckLists extends FirestoreContainer {
  get values() {
    return {

    };
  }

  get queries() {
    return {
      checkListsByUser: (uid) => {
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