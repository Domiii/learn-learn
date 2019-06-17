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
      times: this.db.collection('times')
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
      },

      getScheduleTimes: {
        query: (scheduleId) => this.ref.times.where('scheduleId', '==', scheduleId),
        map: (snapshot) => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        // ({
        //   list: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        // })
      },


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
      async createSchedule(name) {
        const schedule = {
          name,
          createdAt: Firebase.firestore.FieldValue.serverTimestamp()
        };

        return this.collection.add(schedule);
      },

      async createScheduleTime({ scheduleId, when, nRepeats, exceptions, duration, period }) {
        const time = {
          scheduleId,
          when,
          nRepeats,
          exceptions, 
          duration, 
          period
        };

        return this.refs.times.add(time);
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