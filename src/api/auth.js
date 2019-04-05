import firebase from 'firebase';


export async function login() {
  var provider = new firebase.auth.GoogleAuthProvider();
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