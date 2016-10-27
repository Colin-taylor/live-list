import React, { Component, PropTypes } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import autoBind from 'react-autobind';
import NavDrawer from './components/NavDrawer';


// Needed for onTouchTap 

injectTapEventPlugin();
class App extends Component {
    constructor(props) {
      super(props)
      autoBind(this);
      this.state = {};

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
