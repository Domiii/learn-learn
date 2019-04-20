import FirestoreContainer from 'unstated-ext/FirestoreContainer';

export default class LearnerLogEntries extends FirestoreContainer {
  static n = 'learnerLogEntries';

  get actions() {
    return {
      add: (entry) => {
        if (!entry.uid) {
          throw new Error('invalid LearnerLogEntry must have uid: ' + entry);
        }
        this.collection.add(entry);
      },
      save: (entryId, entry) => {
        this.collection.doc(entryId).update(entry);
      }
    };
  }

  get values() {
    return {
    };
  }

  get queries() {
    return {
      byUser: {
        query: (uid) => {
          return this.collection.where('uid', '==', uid);
        }
      }
    };
  }
}