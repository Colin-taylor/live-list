import React , { Component } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class AboutPage extends Component {
    render() {
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