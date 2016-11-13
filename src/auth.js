import * as firebase from 'firebase';
import config from './firebase.config.js';
firebase.initializeApp(config);
// var loggedInUser;
// firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     // User is signed in.
//     loggedInUser = user;
//     console.log(user)
//   } else {
//     // No user is signed in.
//     user = null;
//   }
// });
function requireAuth(nextState, replace) {
    if (!firebase.auth().currentUser) {
        let hasLocalStorageUser = false;
        for (let key in localStorage) {
            if (key.startsWith("firebase:authUser:")) {
                hasLocalStorageUser = true;
            }
        }
        if (!hasLocalStorageUser) {
            console.log('Attempting to access a secure route. Please authenticate first.');
            replace({
                pathname: '/',
                state: { nextPathname: nextState.location.pathname }
            });
        }
    }
};
// function requireAuth(nextState, replace) {
// console.log('firebase user ' +firebase.auth().currentUser)
//     if(typeof loggedInUser === 'undefined') {
//       console.log('was undefined')
//         replace({
//           pathname: '/',
//           state: { nextPathname: nextState.location.pathname }
//         })
//     }
// }

export default requireAuth;