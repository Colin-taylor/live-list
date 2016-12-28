import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import firebase from 'firebase/app';
import autoBind from 'react-autobind';
import base from '../Rebase.config';
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
    componentWillMount() {
        console.log('hello')
        this.initApp().then(user => this.addUserObj(user)); 
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => { 
             if(user) this.props.router.push('/dashboard');
        });
    }
    
    initApp() {
        return new Promise((resolve, reject) => {
        firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
        //   var {email} = result.user;
          resolve(result.user)
        } else {
            reject('not logged in')
          // [END_EXCLUDE]
        }
        // The signed-in user info.
        // var user = result.user;
      }).catch(function(error) {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
    
    
        console.error(error);
    
        reject(error)
        // [END_EXCLUDE]
      });
      })
    }
    addUserObj(user) {
        let context = this;
        let {email, uid} = user; 
        base.post(`users/${uid}`, {
            data: {email: user.email},
            then(err){
             if(!err){
                context.props.router.push('/dashboard')
            }
        } 
        });
    }
    onSignUpClick() { 
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('https://www.googleapis.com/auth/plus.login');

        firebase.auth().signInWithRedirect(provider);
    }
    render() {
        return (

            <div className="content center-xs">
                <h1>🦄🦄🦄🦄</h1>
                <h3>Sign in with Google</h3>
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