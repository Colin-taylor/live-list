import React, {Component} from 'react';
// import auth from '../auth';
import Avatar from 'material-ui/Avatar';
import firebase from 'firebase';
import {EditorFormatListBulleted} from 'material-ui/svg-icons';
import IconButton from 'material-ui/IconButton';
import styles from '../IconStyles';
class DashboardPage extends Component {
    constructor(props) {
        super(props)
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
    render() {
        console.log(styles)
        // const photoURL = 'https://api.adorable.io/avatars/135/abott@adorable.io.png';
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
                <section className="row">
        <IconButton
            className="col-xs-6"
            iconStyle={styles.largeIcon}
            style={styles.large}
            toolTip={<span>List</span>}>
            <EditorFormatListBulleted/>
        </IconButton>
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