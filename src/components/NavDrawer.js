import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import autoBind from 'react-autobind';
import { Link, IndexLink } from 'react-router';
class NavDrawer extends Component {
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
    render() {
        return (
        <div>
        <AppBar
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={ this.onOpenClick }
          title="Title"
        />
        <Drawer open={this.state.open}>
          <IndexLink activeClassName="active" to="/">
            <MenuItem>Home</MenuItem>
          </IndexLink>
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