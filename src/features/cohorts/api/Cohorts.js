import Firebase from 'firebase/app';
import FirestoreContainer from "unstated-ext/FirestoreContainer";
import NotLoaded from 'NotLoaded';

import Users from 'features/users/api/Users';
import CurrentUser from 'api/state/CurrentUser';

const MergeTrue = Object.freeze({ merge: true });
const EmptyArray = Object.freeze([]);
const EmptyObject = Object.freeze({});

class Cohorts extends FirestoreContainer {
  static n = 'cohorts';
  static Dependencies = [CurrentUser, Users];

  get refs() {
    return {
      cohortUserEntries: this.db.collection('cohortUserEntries'),   // actual entry is stored here
      cohortIdsOfUser: this.db.collection('cohortIdsOfUser'),       // only for reverse lookup
    };
  }

  get values() {
    return {
      all: { ref: this.collection },
      allCohortsArray: {
        ref: this.collection,
        map(snap) {
          return snap.docs.map(d => ({ cohortId: d.id, ...d.data() }));
        }
      }
    };
  }

  get queries() {
    return {
      getCohort: {
        query: cohortId => this.doc(cohortId),
        map(snap) {
          return snap.exists && snap.data() || null;
        }
      },
      cohortUserEntries: cohortId => this.refs.cohortUserEntries.doc(cohortId),
      cohortIdsOfUser: uid => this.refs.cohortIdsOfUser.doc(uid),
      cohortIdsNotOfUser: uid => this.refs.cohortIdsOfUser.where(uid, '==', null),
      cohortUserEntry: (cohortId, uid) => this.refs.cohortIdsOfUser.doc(uid).where(cohortId, '>=', 1)
    };
  }

  get selectors() {
    return {
      getCohortName(cohortId) {
        const cohort = this.getCohort(cohortId);
        if (cohort === NotLoaded) { return NotLoaded; }

        return cohort && cohort.name || '';
      },
      getUserEntriesOfCohort(cohortId) {
        const snap = this.cohortUserEntries(cohortId);
        if (snap === NotLoaded) { return NotLoaded; }

        return snap.data();
      },
      getUidsOfCohort(cohortId) {
        const snap = this.cohortUserEntries(cohortId);
        if (snap === NotLoaded) { return NotLoaded; }

        return snap.exists && Object.keys(snap.data()) || EmptyArray;
      },
      getCohortIdsOfUser(uid) {
        const snap = this.cohortIdsOfUser(uid);
        if (snap === NotLoaded) { return NotLoaded; }

        return snap.exists && Object.keys(snap.data()) || EmptyArray;
      },
      getCohortIdsWhereNotUser(uid) {
        const snap = this.cohortIdsNotOfUser(uid);
        if (snap === NotLoaded) { return NotLoaded; }

        return snap.exists && Object.keys(snap.data()) || EmptyArray;
      },
      getCohortUserEntry(cohortId, uid) {
        const snap = this.cohortUserEntry(cohortId, uid);
        if (snap === NotLoaded) { return NotLoaded; }

        if (snap.docs.length === 0) {
          return null;
        }
        return snap.docs[0].data();
      },
      getMyCohortIds() {
        const { uid } = this.deps.currentUser;
        if (uid === NotLoaded) { return NotLoaded; }

        return this.getCohortIdsOfUser(uid);
      },
      getNotMyCohortIds() {
        const { uid } = this.deps.currentUser;
        if (uid === NotLoaded) { return NotLoaded; }

        return this.getCohortIdsWhereNotUser(uid);
      }
      // getUsersOfCohort(cohortId) {
      //   const { users } = this.deps;
      // }
    };
  }

  get actions() {
    return {
      async createCohort(name) {
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
          [uid]: {
            createdAt: Firebase.firestore.FieldValue.serverTimestamp()
          }
        }

        const increment = Firebase.firestore.FieldValue.increment(1);

        batch.set(this.refs.cohortUserEntries.doc(cohortId), entry, MergeTrue);
        batch.set(this.refs.cohortIdsOfUser.doc(uid), { [cohortId]: 1 }, MergeTrue);
        batch.set(this.doc(cohortId), { userCount: increment }, MergeTrue);

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