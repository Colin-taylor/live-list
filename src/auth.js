import * as firebase from 'firebase';
import config from './firebase.config.js';
firebase.initializeApp(config);
var loggedInUser;
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
function requireAuth(nextState, replace) {
    if(typeof loggedInUser === 'undefined') {
        replace({
          pathname: '/',
          state: { nextPathname: nextState.location.pathname }
        })
    }
}

export default requireAuth;