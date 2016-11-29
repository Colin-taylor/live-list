import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Eject from 'material-ui/svg-icons/action/eject';

import autoBind from 'react-autobind';
import { Link, IndexLink } from 'react-router';
import firebase from 'firebase';

class NavDrawer extends Component {
    constructor(props) {
      super(props)
      autoBind(this);
      this.state = {
        open : false,
        user: undefined
      };

    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => { 
             if(user) this.setState({ user: user })
        })
    }
    onOpenClick() {
      this.setState({
        open: !this.state.open
      })
    }
    logOut() {
      firebase.auth().signOut().then(function() {
          // Sign-out successful.
          this.props.router.push('/')
        }, function(error) {
          // An error happened.
        });
    }
    render() {
        return (
        <div>
        <AppBar
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          iconElementRight={this.state.user ? 
            <FlatButton 
              label="Logout"
              icon={<Eject/>}
              onClick={this.props.logout}
              secondary={true} />
           : undefined}
          onLeftIconButtonTouchTap={(e) => {e.preventDefault();  this.onOpenClick() }}
          title="List App"
        />
        <Drawer open={this.state.open}>
            { this.state.user ?
             <Link activeClassName="active" to="dashboard">
              <MenuItem>Dashboard</MenuItem>
            </Link> 
            :  
             <IndexLink activeClassName="active" to="/">
                <MenuItem>Home</MenuItem>
              </IndexLink> }
              <Link activeClassName="active" to="about">
                <MenuItem>About</MenuItem>
              </Link>
          <Link activeClassName="active" to="courses">
            <MenuItem>CoursesPage</MenuItem>
          </Link>
        </Drawer>
        {this.state.open ? (<div onClick={this.onOpenClick} className="nav-overlay"></div>) : undefined}
        </div>
        );
    }
}

export default NavDrawer;