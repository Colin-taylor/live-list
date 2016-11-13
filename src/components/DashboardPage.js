import React, {Component} from 'react';
// import auth from '../auth';
import Avatar from 'material-ui/Avatar';
import firebase from 'firebase';
import {EditorFormatListBulleted} from 'material-ui/svg-icons';
import IconButton from 'material-ui/IconButton';
import styles from '../IconStyles';
import autobind from 'react-autobind';
import {Link} from 'react-router';
class DashboardPage extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            user: ''
        };
    }
    componentWillMount() {
        const user = firebase.auth().currentUser;
        if(user) {
            this.setState({
                user: user,
            });
        }
    }
    handleListClick() {
        this.props.router.push('/create-list');
    }
    render() {
        const {photoURL} = this.state.user;
        return (
            <div>
                <section className="row center-xs">
                    <h1 className="text-center">DashboardPage</h1>
                </section>
                <section className="row center-xs">
                 <Avatar
                    src={photoURL}
                    size={30}
                 />
                </section>
                <section className="row center-xs">
                <div className="col-xs-6">
                    <Link to="create-list">
                        <IconButton
                            iconStyle={styles.largeIcon} 
                            style={styles.large}
                            tooltip={<span>List</span>}>
                            <EditorFormatListBulleted/>
                        </IconButton>
                    </Link>
                </div>
        <IconButton
            className="col-xs-6"
            iconStyle={styles.largeIcon}
            style={styles.large}>
            <EditorFormatListBulleted/>
        </IconButton>
        </section>
            </div>
        );
    }
}

export default DashboardPage;