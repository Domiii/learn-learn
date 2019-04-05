import firebase from './firebase';
import Firebase from 'firebase/app';

export async function onAuthStateChanged(fn) {
  return firebase.auth().onAuthStateChanged(fn);
}

export async function login() {
  var provider = new Firebase.auth.GoogleAuthProvider();
  //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  try {
    const result = await firebase.auth().signInWithPopup(provider);

    // finished logging in!
    console.log('Login: ', result);
  }
  catch (err) {
    alert('login error: ' + err.message);
    console.error('login error:', err);
  }
}


export async function logout() {
  return firebase.auth().signOut();
}

export default firebase.auth();