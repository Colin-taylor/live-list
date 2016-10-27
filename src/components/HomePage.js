import React , { Component } from 'react'
import FlatButton from 'material-ui/FlatButton';

import lightBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Link } from 'react-router'

class HomePage extends Component {
    render() {
        return (

            <div className="content">
                <h1>PS Admin</h1>
                <Link to="about" className="btn btn-primary">
                    <FlatButton 
                    backgroundColor={'#1755c8'}
                    label="Learn More"/>
                </Link>
            </div>

        )
    }
} 

export default HomePage;