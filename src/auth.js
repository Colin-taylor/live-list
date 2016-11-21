import * as firebase from 'firebase';
import config from './firebase.config.js';
firebase.initializeApp(config);

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


export default requireAuth;