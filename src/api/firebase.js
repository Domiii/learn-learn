import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyA4I6snuacDX4NEVThGONja4GI542qBg-w",
  authDomain: "iot-fun-a9915.firebaseapp.com",
  databaseURL: "https://iot-fun-a9915.firebaseio.com",
  projectId: "iot-fun-a9915",
  storageBucket: "iot-fun-a9915.appspot.com",
  messagingSenderId: "346802777536"
};

/**
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
 */
var getGlobal = function () { 
  if (typeof window !== 'undefined') { return window; } 
  if (typeof global !== 'undefined') { return global; } 
  throw new Error('unable to locate global object'); 
}; 


const app = firebase.initializeApp(config);
getGlobal().firebase = app;

export const fs = app.firestore();
export const db = fs;
export default app;