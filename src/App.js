import React, { Component, PropTypes } from 'react';
import './App.css';
import AppBar from 'material-ui/AppBar';
import lightBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import autoBind from 'react-autobind';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
class App extends Component {
    constructor(props) {
      super(props)
      autoBind(this);
      this.state = {
        open : false,
      };

    }
    onOpenClick() {
      this.setState({
        open: !this.state.open
      })
    }
    overlayClick() {
      this.setState({
        open: !this.state.open
      })
    }
    render() {
        return (
        <MuiThemeProvider>
        <div>
        <AppBar
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={ this.onOpenClick }
          title="Title"
        />
        <Drawer open={this.state.open}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
        {this.state.open ? (<div onClick={this.onOpenClick} className="nav-overlay"></div>) : undefined}
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
