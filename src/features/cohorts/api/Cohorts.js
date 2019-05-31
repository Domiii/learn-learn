import Firebase from 'firebase/app';
import FirestoreContainer from "unstated-ext/FirestoreContainer";

class Cohorts extends FirestoreContainer {
  get refs() {
    return {
      cohortUsers: this.db.collection('cohortUsers'),         // actual entry is stored here
      cohortIdsOfUser: this.db.collection('cohortIdsOfUser'), // for supporting reverse lookup
    };
  }

  get values() {
    return {
      all: { ref: this.collection }
    };
  }

  get queries() {
    return {
      cohortUsers: cohortId => this.refs.cohortUsers.doc(cohortId),
      cohortIdsOfUser: uid => this.refs.cohortIdsOfUser.doc(uid)
    };
  }

  get selectors() {
    return {
    };
  }

  get actions() {
    return {
      async ceateCohort(name) {
        const cohort = {
          name,
          userCount: 0,
          createdAt: Firebase.firestore.FieldValue.serverTimestamp()
        };

        return this.collection.add(cohort);
      },
      async addUserToCohort(cohortId, uid) {
        // see: https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes
        const batch = this.db.batch();

        // create new entry to add to cohortUsers
        const entry = {
          uid,
          createdAt: Firebase.firestore.FieldValue.serverTimestamp()
        }
        
        const increment = Firebase.firestore.FieldValue.increment(1);

        batch.set(this.refs.cohortUsers.doc(cohortId), entry);
        batch.set(this.refs.cohortIdsOfUser.doc(uid), { cohortId });
        batch.set(this.doc(cohortId), { userCount: increment }, { merge: true });

        await batch.commit();
      },
      removeUserFromCohort(cohortId, uid) {

      }
    };
  }
}

export default Cohorts;