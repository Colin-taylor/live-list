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
            friendEmail: '',
            dataSource: []
        }
    }
    componentDidMount() {
            const {user} = this.props;
            base.fetch('users', {
            context: this,
            asArray: true,
            then(data){
                console.log(data);
                this.setState({
                    dataSource: data.filter(i => i.email !== user.email )
                    .map(i => (
                         {
                            text: i.email,
                            value: (
                            <MenuItem
                                primaryText={i.email}
                                secondaryText="&#9786;"
                                onTouchTap={()=>this.onSelectFriend(i)}
                            />
                            ),
                        }
                        )), 
                    // searchResults: data.filter(i => i.email === this.state.friendEmail.trim()),
                    // showFindFriendForm: false,
                });
            }
        })
    }
    onSelectFriend(e) {
        console.log(e)
    }
    handleInputChange(e, stateProp) {
        this.setState({
            [stateProp]: e.target.value,
            errorText: '',
        });
    }
    handleFriendEmailSubmit(e) {
        e.preventDefault();
    
        console.log(this.state.friendEmail)
    }
    render () {
        const {showFindFriendForm, searchResults} = this.state;
        return (
           <section className="row center-xs">
                <div className="col-xs-12 col-lg-6">
                   <IconButton
                            iconStyle={styles.largeIcon}
                            onClick={() => this.setState({ showFindFriendForm: !showFindFriendForm})} 
                            style={styles.large}
                            tooltip={<span>Find a Friend</span>}>
                            <SocialPersonAdd/>
                    </IconButton>
                     {showFindFriendForm ?
                        <form onSubmit={(e)=>this.handleFriendEmailSubmit(e)} className="flex-column-center">
                          <AutoComplete
                            hintText="Type anything"
                            dataSource={this.state.dataSource}
                            onUpdateInput={(e) => console.log(e)}
                        />
                    </form>
                    : undefined }
                    <div>
                    {searchResults.length ?
                    <List> 
                        {searchResults.map(p => (
                            <ListItem key={uuid.v4()}
                                      primaryText={p.email}/>
                        ))}
                        </List>
                        : undefined}
                        </div>
                    </div>
        </section>
        )
    }
}

export default FriendSearch;

