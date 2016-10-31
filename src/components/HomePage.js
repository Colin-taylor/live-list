import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import firebase from 'firebase/app';
import autoBind from 'react-autobind';
const styles = {
    largeIcon: {
        fontSize: '3rem',
    },
};


class HomePage extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
        
    }

    componentDidMount() {
        this.initApp().then(res => {
            console.log(`res is ${res}`)
            this.props.router.push('/dashboard')

        });
    }
    initApp() {
        return new Promise((resolve, reject) => {
        firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          var {email} = result.user;
          const user = {
              token,
              email
          }
          console.log(user)
          resolve(user)
        } else {
            console.log('something else')
            reject('not logged in')
          // [END_EXCLUDE]
        }
        // The signed-in user info.
        // var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
        reject(error)
        // [END_EXCLUDE]
      });
      })
    }
    onSignUpClick() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');

        firebase.auth().signInWithRedirect(provider);
    }
    render() {
        return (

            <div className="content">
                <h1>🦄🦄🦄🦄</h1>
                Sign in
                    <IconButton iconClassName="fa fa-google"
                    iconStyle={styles.largeIcon}
                    onClick={this.onSignUpClick}
                    >
                </IconButton>


            </div>

        )
    }
}

export default HomePage;