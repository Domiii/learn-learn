import Firebase from 'firebase/app';
import FirestoreContainer from "unstated-ext/FirestoreContainer";

class Cohorts extends FirestoreContainer {
  static n = 'cohorts';
  get refs() {
    return {
      cohortUserEntries: this.db.collection('cohortUserEntries'),   // actual entry is stored here
      cohortIdsOfUser: this.db.collection('cohortIdsOfUser'),       // only for reverse lookup
    };
  }

  get values() {
    return {
      all: { ref: this.collection }
    };
  }

  get queries() {
    return {
      cohortUserEntries: cohortId => this.refs.cohortUserEntries.doc(cohortId),
      cohortIdsOfUser: uid => this.refs.cohortIdsOfUser.doc(uid)
    };
  }

  get selectors() {
    return {
      getUsersOfCohort(cohortId) {
        // TODO: Check out react-hooks + unstated-next
      }
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

        // create new entry to add to cohortUserEntries
        const entry = {
          uid,
          createdAt: Firebase.firestore.FieldValue.serverTimestamp()
        }
        
        const increment = Firebase.firestore.FieldValue.increment(1);

        batch.set(this.refs.cohortUserEntries.doc(cohortId), entry);
        batch.set(this.refs.cohortIdsOfUser.doc(uid), { cohortId });
        batch.set(this.doc(cohortId), { userCount: increment }, { merge: true });

        return await batch.commit();
      },

      async removeUserFromCohort(cohortId, uid) {
        const batch = this.db.batch();

        batch.delete(this.refs.cohortUserEntries.doc(cohortId));
        batch.delete(this.refs.cohortIdsOfUser.doc(uid));
        batch.delete(this.doc(cohortId));

        return await batch.commit();
      }
    };
  }
}

export default Cohorts;