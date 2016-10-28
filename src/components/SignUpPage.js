import React , { Component } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// var firebase = require('firebase/app');
// all 3 are optional and you only need to require them at the start
import firebase from 'firebase/app';
require('firebase/auth');

class AboutPage extends Component {
    render() {
        // var provider = new firebase.auth.GoogleAuthProvider();

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

export default AboutPage;