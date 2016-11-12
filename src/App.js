import React, { Component, PropTypes } from 'react';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import autoBind from 'react-autobind';
import NavDrawer from './components/NavDrawer';
import firebase from 'firebase/app';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiBasePalette from './muiBasePalette';
const muiTheme = getMuiTheme(muiBasePalette);

// Needed for onTouchTap 
injectTapEventPlugin();

class App extends Component {
    constructor(props) {
      super(props)
      autoBind(this);
      this.state = {};
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
  logOut() {
    console.log('auth clickedd')
      firebase.auth().signOut().then(() => {
          // Sign-out successful.
          console.log('auth succes')
          this.props.router.push('/logout')
          window.location.reload();
        }, function(error) {
          console.log('error was::::' +error)
          // An error happened.
        });
  }
    render() {
        return (
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <NavDrawer logout={this.logOut}/>
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
