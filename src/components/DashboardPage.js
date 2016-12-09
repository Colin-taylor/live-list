import React, {Component} from 'react';
// import auth from '../auth';
import colors from '../muiBasePalette';
import uuid from 'node-uuid'; 

import firebase from 'firebase';
import {
    EditorFormatListBulleted, 
    ContentCreate,
    NavigationMoreVert,
    ActionDelete,
    SocialPersonAdd,
    } from 'material-ui/svg-icons';  
import {Avatar,
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

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <NavigationMoreVert/>
  </IconButton>
);



class DashboardPage extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            user: firebase.auth().currentUser,
            showForm: false,
            showFindFriendForm: false,
            friendEmail: '',
            listName: '',
            errorText: '',
            lists: [],
            searchResults: [],
            deleteDialogOpen: false,
            loading: true,
        };
        this.hasStateSynced = false;
    }
    componentWillMount() {
        if(!this.state.user) {
            firebase.auth().onAuthStateChanged(user => { 
                if(user) {
                    console.log(`auth state user ${user}`)
                    this.setState({
                        user,
                    });
                     this.syncState();
                }
            })

        } else {
            this.syncState();
        }
    }
    syncState() {
        if(!this.hasStateSynced) {
            this.hasStateSynced = true;
            const {user} = this.state;
            console.log('state has been synced')
            this.ref = base.syncState(`${user.uid}/lists`, {
                        context: this,
                        state: 'lists',
                        asArray: true,
                        then() {
                            //const sorted = this.state.lists.sort((a,b) => a.dateCreated + b.dateCreated);
                        }
                    });
        }
    }
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }
    
    deleteActions() {
        return ([
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => this.setState({deleteDialogOpen: false})}
                />,
            <FlatButton
                label="Delete"
                primary={true}
                onTouchTap={this.handleDelete}
                />,
        ]);
    } 
    rightIconMenu (itemToDelete) {
        return (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem>Share</MenuItem>
                <MenuItem onTouchTap={() => this.setState({deleteDialogOpen: true, itemToDelete})}>Delete</MenuItem>
            </IconMenu>
        );
    }
    handleDelete () {
        console.log(this.state.itemToDelete)
        const {itemToDelete, lists} = this.state;
        console.log('list are::::   ' + lists)
        // const newLists = 
        this.setState({
            lists: lists.filter(list => list.key !== itemToDelete.key),
        });
        this.setState({deleteDialogOpen: false});
    }
    handleInputChange(e, stateProp) {
        this.setState({
            [stateProp]: e.target.value,
            errorText: '',
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const {user, listName, lists} = this.state;
        const dup = lists.filter(list => list.name === listName);
        const context = this;
    
        if(!dup.length) {
            const list = {
                key: uuid.v4(),
                name: listName,
            }
            base.post(`${user.uid}/lists/${list.key}`, {
                data: {name: listName, dateCreated: Date.now()},
                then()  {
                    context.props.router.push({ pathname: 'create-list', state: list});
                }
            })

        } else {
             this.setState({
                        errorText: 'This name is already in use.',
                    });
        }


    }
    handleFriendEmailSubmit(e) {
        e.preventDefault();
        base.fetch('users', {
            context: this,
            asArray: true,
            then(data){
                console.log(data);
                this.setState({ 
                    searchResults: data.filter(i => i.email === this.state.friendEmail.trim()),
                    showFindFriendForm: false,
                });
            }
        })
        console.log(this.state.friendEmail)
    }

    render() {

        const {deleteDialogOpen, showForm, user, lists, showFindFriendForm, searchResults} = this.state;
        return (
            <div>
                <section className="row center-xs">
                    <h1 className="text-center">DashboardPage</h1>
                </section>
                <section className="row center-xs">
           
                </section>
                <section className="row center-xs">
                <div className="col-xs-12 col-lg-6">
                    <IconButton
                            iconStyle={styles.largeIcon}
                            onClick={() => this.setState({ showForm: !showForm})} 
                            style={styles.large}
                            tooltip={<span>Create List</span>}>
                            <ContentCreate/>
                    </IconButton>
                    {showForm ?
                        <form onSubmit={(e)=>this.handleSubmit(e)} className="flex-column-center">
                        <TextField
                            errorText={this.state.errorText}
                            hintText="List Name"
                            onChange={(e) =>this.handleInputChange(e,'listName')}
                            value={this.state.listName}
                        />
                            <RaisedButton onClick={(e)=>this.handleSubmit(e)} label="Create List" primary={true} style={{margin: '4% 0',}}/>
                    </form>
                    : undefined }

                        
                </div>
        <div className="col-xs-12 col-lg-6">
            {lists.length ?
            <Paper zDepth={1}>
            <List>
                <h4>Your Lists</h4>
                <Divider/>
                {lists.map(list => (
                    <ListItem 
                        key={uuid.v4()}
                        onTouchTap={() => this.props.router.push({ pathname: 'create-list', state: list})}
                        primaryText={list.name}
                        rightIconButton={this.rightIconMenu(list)}
                    />
                ))}
            </List>
            </Paper>
             : <h4>You have no lists.</h4>}
        </div>
        </section>
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
                        <TextField
                            errorText={this.state.errorText}
                            hintText="Friend's email address"
                            onChange={(e) =>this.handleInputChange(e,'friendEmail')}
                            value={this.state.friendEmail}
                        />
                            <RaisedButton label="Search" primary={true} style={{marginBottom: '2%'}}/>
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
          <Dialog
          actions={this.deleteActions()}
          modal={false}
          open={deleteDialogOpen}
          onRequestClose={() => this.setState({deleteDialogOpen: false})}
        >
          Delete this list?
        </Dialog>
    </div>
        );
    }
}

export default DashboardPage;