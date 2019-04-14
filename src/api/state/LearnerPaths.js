import FirestoreContainer from 'unstated-ext/FirestoreContainer';

export default class LearnerPaths extends FirestoreContainer {
  static n = 'learner';

  get actions() {
    return {
      updateA: (id, a) => {
        const upd = { a };
        return this.doc(id).update(upd);
      },
    };
  }

  get values() {
    return {
      all: {
        ref: this.collection
      }
    };
  }

  get queries() {
    return {
      list: {
        query: (page, resultsPerPage, tag, order, orderDirection = "desc") => {
          // TODO: Firestore does not support OR queries. Can only filter by one tag.
          // See: https://issuetracker.google.com/issues/129070817?pli=1

          // https://firebase.google.com/docs/firestore/query-data/order-limit-data
          const start = page * resultsPerPage;
          return this.collection
            .where('tags', 'array-contains', tag)
            .orderBy(order, orderDirection)
            .startAt(start)
            .limit(resultsPerPage);
        }
      },
      byId: {
        query: this.doc,
        map: snap => snap.data()
      }
    };
  }
}