import firebase from 'firebase';
const 
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    loggedInUser = user;
    console.log(user)
  } else {
    // No user is signed in.
    user = null;
  }
});