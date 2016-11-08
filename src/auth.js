import React from 'react';
import * as firebase from 'firebase';
import config from './firebase.config.js';
firebase.initializeApp(config);
var user;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    user = user;
    console.log(user)
  } else {
    // No user is signed in.
    user = null;
  }
});
function requireAuth(nextState, replace) {
    if(user === null) {
        replace({
          pathname: '/',
          state: { nextPathname: nextState.location.pathname }
        })
    }
}

export default requireAuth;