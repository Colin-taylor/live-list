import React, {Component} from 'react';
import auth from '../auth';
import Avatar from 'material-ui/Avatar';
class DashboardPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: auth.isLoggedIn(),
        };
        console.log('user is ' +JSON.stringify(this.state.user))
    }
    componentDidMount() {
        
    }
    render() {
        const {photoURL} = this.state.user;
        return (
            <div>
                <h1>DashboardPage</h1>
                 <Avatar
          src={photoURL}
          size={30}
        />
            </div>
        );
    }
}

export default DashboardPage;