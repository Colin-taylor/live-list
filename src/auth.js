import firebase from 'firebase';

const auth = {
    isLoggedIn: () => firebase.auth().currentUser    
}

export default auth;