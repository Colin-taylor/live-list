import React, { Component, PropTypes } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import autoBind from 'react-autobind';
import NavDrawer from './components/NavDrawer';
import firebase from 'firebase/app';
require('firebase/auth');
const config = {
    apiKey: "AIzaSyDpqkEhgrebz8r00mUklzve9Z7vYGsigps",
    authDomain: "react-list-37a1e.firebaseapp.com",
    databaseURL: "https://react-list-37a1e.firebaseio.com",
    storageBucket: "react-list-37a1e.appspot.com",
    messagingSenderId: "132861909433"
  };
// Needed for onTouchTap 

injectTapEventPlugin();
class App extends Component {
    constructor(props) {
      super(props)
      autoBind(this);
      this.state = {};
      firebase.initializeApp(config);

    }

    render() {
        return (
        <MuiThemeProvider>
          <div>
            <NavDrawer/>
            <div className="content"> 
              {this.props.children}
            </div>
          </div>
        </MuiThemeProvider>
        );
    }
}

App.propTypes = {
  children: PropTypes.object.isRequired
}
export default App;
