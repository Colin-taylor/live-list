/* eslint-disable */
import React , { Component } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// var firebase = require('firebase/app');
// all 3 are optional and you only need to require them at the start
import firebase from 'firebase/app';
require('firebase/auth');

const config = {
    apiKey: "AIzaSyDpqkEhgrebz8r00mUklzve9Z7vYGsigps",
    authDomain: "react-list-37a1e.firebaseapp.com",
    databaseURL: "https://react-list-37a1e.firebaseio.com",
    storageBucket: "react-list-37a1e.appspot.com",
    messagingSenderId: "132861909433"
  };
class SignUpPage extends Component {
    constructor(props) {
        super(props)
        //   firebase.initializeApp(config);
          
          this.provider = new firebase.auth.GoogleAuthProvider();
    }

    render() {

        return (
            <div className="content">
                <TextField
                    hintText="UserName Field"
                    floatingLabelText="User Name"/>
                <TextField
                    hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"/>
                <RaisedButton
                    label="Sign Up"
                    primary={true}
                />
            </div>
        )
    }
} 

export default SignUpPage;