import React, {Component} from 'react';
// import auth from '../auth';
import colors from '../muiBasePalette';
import firebase from 'firebase';
import {
    EditorFormatListBulleted, 
    ContentCreate,
    NavigationMoreVert,
    ActionDelete,
    } from 'material-ui/svg-icons';  
import {Avatar,
        Dialog,
        FlatButton,
        IconButton,
        IconMenu,
        MenuItem,
        List,
        ListItem,
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
                    // then(lists) {
                    //     console.log(lists)
                    //     this.setState({ lists })
                    // }
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
        console.log(Object.keys(lists))
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
        const {user, listName} = this.state;
        console.log(`${user.uid}/${listName}`)
        base.fetch(`${user.uid}/lists/${listName}`, {
            context: this,
            asArray: true,
            then(data) {
                if(!data.length) {
                    this.props.router.push({ pathname: 'create-list', state: listName})
                } else {
                    this.setState({
                        errorText: 'This name is already in use.',
                    });
                }
            }
        })
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
                <div className="col-xs-6">
                    <IconButton
                            iconStyle={styles.largeIcon}
                            onClick={() => this.setState({ showForm: true})} 
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
                            <FlatButton label="Create List" />
                    </form> 
                    : undefined }

                        
                </div>
        <div className="col-xs-6">
            {lists ? 
            <List>
                {Object.keys(lists).map(list => (
                    <ListItem 
                        key={list}
                        onTouchTap={() => this.props.router.push({ pathname: 'create-list', state: list})}
                        primaryText={list}
                        rightIconButton={this.rightIconMenu(list)}
                    />
                ))}
            </List>
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