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
            user: '',
            showForm: false,
            listName: '',
            errorText: '',
            lists: [],
            deleteDialogOpen: false,
            loading: true,
        };
    }
    componentWillMount() {
        // const user = firebase.auth().currentUser;
        firebase.auth().onAuthStateChanged(user => { 
            if(user) {
                this.setState({
                    user,
                });
                console.log(`${user.uid}`)
                base.syncState(`${user.uid}/lists`, {
                    context: this,
                    state: 'lists',
                    asArray: true,
                    then() {
                        const sorted = this.state.lists.sort((a,b) => a.dateCreated + b.dateCreated);
                        
                        this.setState({
                            loading: false,
                            lists: sorted,
                        })
                    }
                });
            }
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
        const newLists = Object.keys(lists).filter((list) => (
            console.log(lists)
            //  list !== itemToDelete
             ));
        // this.setState({
        //     lists: newLists,
        // })
    }
    handleListNameChange(e) {
        this.setState({
            listName: e.target.value,
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

        // base.fetch(`${user.uid}/lists/${listName}`, {
        //     context: this,
        //     asArray: true,
        //     then(data) {
        //         if(!data.length) {
        //             this.props.router.push({ pathname: 'create-list', state: listName})
        //         } else {
        //             this.setState({
        //                 errorText: 'This name is already in use.',
        //             });
        //         }
        //     }
        // })
    }

    render() {

        const {deleteDialogOpen, showForm, user, lists} = this.state;
        return (
            <div>
                <section className="row center-xs">
                    <h1 className="text-center">DashboardPage</h1>
                </section>
                <section className="row center-xs">
                 <Avatar
                    src={user.photoURL}
                    size={30}
                 />
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
                            onChange={this.handleListNameChange}
                            value={this.state.listName}
                        />
                            <RaisedButton label="Create List" primary={true} style={{marginBottom: '2%'}}/>
                    </form>
                    : undefined }

                        
                </div>
        <div className="col-xs-12 col-lg-6">
            {lists ?
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
             : <EditorFormatListBulleted style={styles.largeIcon}/>}
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