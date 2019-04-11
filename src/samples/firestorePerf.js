import { fs } from '../api/firebase';

/**
 * Some basic firestore performance experiments.
 * Results: As long as a query has a snapshot listener, doing the same query will return instantly (within 1-2ms).
 */

(async () => {
  const cacheLinger = 5000; // keep cached for 5s after finished
  const fs = firebase.firestore();

  async function snapTest(label) {
    console.time(label);
    let fired = false;
    return new Promise((r, j) => {
      const stop = fs.collection('hi').onSnapshot((x) => {
        if (!fired) {
          console.timeEnd(label, x);
          setTimeout(() => stop(), cacheLinger);
          r(x);
        }
      });
    });
  }

  await Promise.all([
    snapTest('snap1-a'),
    snapTest('snap1-b')
  ]);
  snapTest('snap2')
})();