import FirestoreContainer from "unstated-ext/FirestoreContainer";

export default class UidsOfCohort extends FirestoreContainer {
  get values() {
    return {
      all: { ref: this.collection }
    };
  }

  get queries() {
    return {
      uidsOfCohort: this.doc
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