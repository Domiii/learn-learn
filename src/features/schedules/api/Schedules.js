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
      getSchedulesWhere: {
        query(where) {
          let ref = this.collection;
          if (where) {
            for (const k in where) {
              const v = where[k];
              ref = ref.where(k, '==', v);
            }
          }
          return ref;
        },
        map(snap) {
          return snap.docs;
        }
      }
    };
  }

  get selectors() {
    return {
      getScheduleIdsWhere(where) {
        const docs = this.getSchedulesWhere(where);
        if (docs === NotLoaded) {
          return NotLoaded;
        }

        return docs.map(doc => doc.id);
      }
    };
  }

  get actions() {
    return {
      async createSchedule(name, moreProps) {
        const schedule = {
          name,
          createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
          ...moreProps
        };

        return this.collection.add(schedule);
      },

      getSchedulesOfIds(scheduleIds) {
        return this.constructor.loadFromIds(
          scheduleIds, 'scheduleId', this.getSchedule
        );
      }
    };
  }
}

export default Schedules;