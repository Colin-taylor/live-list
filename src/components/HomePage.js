import React , { Component } from 'react'
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router'

class HomePage extends Component {
    render() {
        return (

            <div className="content">
                <h1>🦄🦄🦄🦄</h1>
                <Link to="signup" className="btn btn-primary">
                    <FlatButton 
                    backgroundColor={'#1755c8'}
                    label="Sign Up"/>
                </Link>
            </div>

        )
    }
} 

export default HomePage;