import React, {Component} from 'react';
// import uuid from 'node-uuid'; 

// import {
//     EditorFormatListBulleted, 
//     ContentCreate,
//     NavigationMoreVert,
//     ActionDelete,
//     SocialPersonAdd,
//     } from 'material-ui/svg-icons';  
import {
        AutoComplete,

        FlatButton,
        // IconButton,
        // IconMenu,
        // List,
        // ListItem,
        MenuItem,
        // Paper,
        // RaisedButton,
        // TextField,
     } from 'material-ui';

// import styles from '../IconStyles';
import autobind from 'react-autobind';

import base from '../Rebase.config';
class FriendSearch extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            showFindFriendForm: false,
            searchResults: [],
            selectedFriend: '',
            dataSource: [],
            user: this.props.user,
        }
        this.isUnmounted = false;
    }
    componentDidMount() {
        const {user} = this.props;
        base.fetch('users', {
            context: this,
            asArray: true,
        }).then(data => {
            const dataSource = data
                .filter(i => i.email !== user.email )
                .map(i => (
                    {
                        text: i.email.toLowerCase(),
                        value: (
                        <MenuItem
                            primaryText={i.email}
                            secondaryText="&#9786;"
                            onTouchTap={()=>this.onSelectFriend(i)}
                        />
                        ),
                    }
                ));
                if(!this.isUnmounted) {
                    this.setState({
                        dataSource 
                        // searchResults: data.filter(i => i.email === this.state.friendEmail.trim()),
                        // showFindFriendForm: false,
                    });
                }
        }).catch(error => console.error(error));
    }
    componentWillUnmount() {
        this.isUnmounted = true;
    }

    onSelectFriend(friend) {
        this.setState({ selectedFriend: friend, });
    }
    handleInputChange(e, stateProp) {
        this.setState({
            [stateProp]: e.target.value,
            errorText: '',
        });
    }
    handleFriendSubmit(e) {
        e.preventDefault();
        const {selectedFriend, user} = this.state;
        const {key} = this.props.list;
        console.log(` list key is === ${key}`)
        base.fetch(`${selectedFriend.key}/shared/`, {
            context: this,
            asArray: true
        }).then(data => {
                console.log(data);
                const result = data.filter(i => i.key === selectedFriend.key);
                    base.post(`${selectedFriend.key}/shared/${user.uid}/`, {
                        data: {friend: user.email},
                    }).then(data => {
                        base.push(`${selectedFriend.key}/shared/${user.uid}/lists/`, {
                            data: {index: key},
                        });
                    })
        }).catch(error => {
                //handle error
        });
        
        // base.push(`${selectedFriend.key}/shared/`, {
        //         data: {friend: user.email, key: user.uid,},
        // }).then(data => {
        //     base.push(`${selectedFriend.key}/shared/lists/`, {
        //         data: {index: key},
        //     });
        // }).catch(err => console.error(err));
        // consol
        //this.props.handleFriendSelection(this.state.selectedFriend)
        // console.log(this.state.selectedFriend)
    }
    render () {
        return (
            <div className="row">
                <AutoComplete
                            hintText="Enter friend's email"
                            dataSource={this.state.dataSource}
                            filter={(searchText, key) => searchText !== '' && key.indexOf(searchText.toLowerCase()) !== -1}
                            onUpdateInput={(e) => console.log(e)}
                        />
                <FlatButton
                        label="Share"
                        primary={true}
                        onTouchTap={this.handleFriendSubmit}
                    />
            </div>
           
        )
    }
}

export default FriendSearch;

