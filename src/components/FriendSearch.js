import React, {Component} from 'react';
import uuid from 'node-uuid'; 

import {
    EditorFormatListBulleted, 
    ContentCreate,
    NavigationMoreVert,
    ActionDelete,
    SocialPersonAdd,
    } from 'material-ui/svg-icons';  
import {
        AutoComplete,
        Dialog,
        Divider,
        FlatButton,
        IconButton,
        IconMenu,
        List,
        ListItem,
        MenuItem,
        Paper,
        RaisedButton,
        TextField, } from 'material-ui';

import styles from '../IconStyles';
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
            dataSource: []
        }
        this.isUnmounted = false;
    }
    componentDidMount() {
            const {user} = this.props;
        base.fetch('users', {
            context: this,
            asArray: true,
        }).then(data => {
                   const dataSource = data.filter(i => i.email !== user.email )
                     .map(i => { 
                         return (
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
                     )});
                if(!this.isUnmounted) {
                    this.setState({
                        dataSource 
                        // searchResults: data.filter(i => i.email === this.state.friendEmail.trim()),
                        // showFindFriendForm: false,
                    });
                }
        }).catch(error => console.error(error))
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
        this.props.handleFriendSelection(this.state.selectedFriend)
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

