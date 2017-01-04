import React, {Component} from 'react';

import uuid from 'node-uuid'; 
import FriendSearch from './FriendSearch';
import SharedLists from './SharedLists';
import firebase from 'firebase';

import {
    ContentCreate,
    NavigationMoreVert,
    NavigationClose,
    } from 'material-ui/svg-icons';  
import {
        //Avatar,
        Dialog,
        Divider,
        FlatButton,
        IconButton,
        IconMenu,
        LinearProgress,
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
            loading: true,
            errorText: '',
            lists: [],
            searchResults: [],
            deleteDialogOpen: false,
        };
        this.hasStateSynced = false;
    }
    componentWillMount() {
        if(!this.state.user) {
            firebase.auth().onAuthStateChanged(user => { 
                if(user) {
                    console.log(`auth state user ${user.email}`)
                    this.setState({
                        user,
                    });
                     this.syncState();
                }
            })

        } else {
            this.syncState();
        }
        window.addEventListener('onbeforeunload', this.closeAnyOpenItems);
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
                            this.setState({ loading: false });
                        }
            });
        }
    }
    componentWillUnmount(){
        window.removeEventListener('onbeforeunload', this.closeAnyOpenItems);
        this.closeAnyOpenItems();
        base.removeBinding(this.ref);
    }
    closeAnyOpenItems() {
        this.setState({
            lists: this.state.lists.map(list => {
                list.isOpen = false;
                return list;
            }),
        })

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
    handleFriendSelection(input) {
            const {user} = this.state;
           return base.post(`${input.key}/shared/`, {
                data: {friend: user.email, key: user.uid },
            })
        // console.log('from the dboard    '+ JSON.stringify(input))
    }
    nestedMenuItems(list, user) {
        //   leftIcon={<SocialShare/>}
        return ([
            <ListItem key={uuid.v4()}  
                      rightIconButton={<IconButton onClick={(e) => this.editMenuOpen(list, false,e)}>
                                            <NavigationClose />
                                        </IconButton>}>
                <div className="row center-xs">
                    <FriendSearch 
                        handleFriendSelection={this.handleFriendSelection} 
                        user={user}
                        list={list}/>
                </div>
            </ListItem>
        ]);
    }
    editMenuOpen(item, bool, e){
        e.preventDefault();
        const {lists} = this.state;
        
        this.setState({
            lists: lists.map(list => {
                        if(list.key === item.key) list.isOpen = bool;
                        return list;
                }),
        })
    }
    openMenuItemToShare(item) {
        const {lists} = this.state;
        console.log('item is::: ' + item)
        const editedLists = lists.map(list => {
                if(list.key === item.key) list.isOpen = true
                return list;
        });
        this.setState({
            lists: editedLists
        })
    } 
    rightIconMenu (item) {
        return (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onTouchTap={() => this.openMenuItemToShare(item)}>Share</MenuItem>
                <MenuItem onTouchTap={() => this.setState({deleteDialogOpen: true, itemToDelete: item})}>Delete</MenuItem>
            </IconMenu>
        );
    }
    handleDelete () {
        const {itemToDelete, lists} = this.state;
        this.setState({
            lists: lists.filter(list => list.key !== itemToDelete.key),
            deleteDialogOpen: false
        });
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
        if(!listName) {
            this.setState({ errorText: 'This field is required',});
            return;
        }
        const dup = lists.filter(list => list.name === listName);
        const context = this;
    
        if(!dup.length) {
            const list = {
                key: uuid.v4(),
                name: listName,
            }
            // ${user.uid}/lists/${list.key}
            base.push(`${user.uid}/lists/`, {
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


    render() {

        const {deleteDialogOpen, showForm, loading, lists, user} = this.state;
        return (
            <div>
                <section className="row center-xs">
                    <h1 className="text-center">DashboardPage</h1>
                </section>

            <section className="row center-xs">
                <div className="col-xs-12 col-lg-2">
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
                {loading ? <LinearProgress mode="indeterminate" /> : undefined}
                    {lists.length ?
                    <Paper zDepth={1}>
                    <List>
                        <h4>Your Lists</h4>
                        <Divider/>
                        {lists.map(list => (
                            <ListItem 
                                key={uuid.v4()}
                                nestedItems={this.nestedMenuItems(list,user)}
                                onTouchTap={() => this.props.router.push({ pathname: 'create-list', state: list })}
                                open={list.isOpen}
                                primaryText={list.name}
                                rightIconButton={this.rightIconMenu(list)}
                            />
                        ))}
                    </List>
                    </Paper>
                    : undefined}
                    {!loading && !lists.length ? <h4>You have no lists.</h4> : undefined}
                    
                    {user ? <SharedLists router={this.props.router} user={user}/> : undefined}
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