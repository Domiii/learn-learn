import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyC-d0HDLJ8Gd9UZ175z7dg6J98ZrOIK0Mc",
  authDomain: "learn-learn-b8e5a.firebaseapp.com",
  databaseURL: "https://learn-learn-b8e5a.firebaseio.com",
  projectId: "learn-learn-b8e5a",
  storageBucket: "",
  messagingSenderId: "249308200308"
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