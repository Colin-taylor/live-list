import React, { Component, PropTypes } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import autoBind from 'react-autobind';
import NavDrawer from './components/NavDrawer';
import firebase from 'firebase/app';
import auth from './auth';
import config from './firebase.config'; 
require('firebase/auth');

// Needed for onTouchTap 

injectTapEventPlugin();
class App extends Component {
    constructor(props) {
      super(props)
      autoBind(this);
      this.state = {};
      console.log(firebase.auth().currentUser)
    }
//     componentWillMount() {
//       console.log(this.props.router.push)
//       firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // User is signed in.
//     auth.currentUser = user;
//     console.log(user)
//           this.props.router.push('/dashboard')

//   } else {
//     // No user is signed in.
//   }
// });
//     }
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
