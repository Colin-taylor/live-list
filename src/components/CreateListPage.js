import React, {
    Component
} from 'react'
// import uuid from 'node-uuid'; 
// import FlatButton from 'material-ui/FlatButton';
import {
    Card,
    CardText,
    CardTitle,
    Divider,
    FlatButton,
    LinearProgress,
    TextField,
    Snackbar,
} from 'material-ui';
import {ActionCheckCircle} from 'material-ui/svg-icons';
import ShoppingList from './ShoppingList';
import autobind from 'react-autobind';
import firebase from 'firebase';
import base from '../Rebase.config';

class CreateListPage extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            items: [],
            itemToAdd: '',
            errorText: '',
            list: this.props.location.state,
            user: '',
            snackOpen: false,
            loading: true,
        };
        this.db = firebase.database();
        console.log('listname is' + JSON.stringify(this.state.list))
        //debugger;
    }

    componentDidMount() {
        const {list} = this.state;
        firebase.auth().onAuthStateChanged(user => {
            
            if (user) {
                this.setState({
                    user
                });
            const owner = list.owner || user.uid;
             this.ref = base.syncState(`${owner}/lists/${list.key}/items`, {
                    context: this,
                    state: 'items',
                    asArray: true,
                    then() {
                        this.setState({ loading: false });
                    }
                })
            };
        });
    }
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }
    addItem(e) {
        e.preventDefault();
        if (this.state.itemToAdd) {

            const newItem = {
                name: this.state.itemToAdd,
                id: Date.now()
            };
            this.setState({
                items: this.state.items.concat(newItem),
                itemToAdd: '',
                snackOpen: true,
            });
        } else {
            this.setState({
                errorText: 'This field is required',
            })
        }
    }
    handleItemChange(e) {
        this.setState({
            itemToAdd: e.target.value,
            errorText: '',
        });
    }
    onDelete(item) {
        const filteredItems = this.state.items.filter(elem => elem.id !== item.id);
        this.setState({
            items: filteredItems,
        });
    }
    onCheck(item) {
        const items = this.state.items.map(elem => {
            if (item.id === elem.id) {
                elem.completed = !item.completed;
            }
            return elem;
        });
        this.setState({
            items,
        });
    }
    
    render () {
        const {items, list, loading} = this.state;
        
        return (
            <div>
                <div className="row center-xs">
                    Create List
                </div>
                <div className="row center-xs">
                <aside className="col-xs-12 col-md-4">
                <Card>
                    <CardTitle title={list.name}/>
                 <CardText>
                    <Divider/>
                    <form onSubmit={this.addItem} className="flex-column-center">
                        <TextField
                            errorText={this.state.errorText}
                            hintText="Item"
                            onChange={this.handleItemChange}
                            value={this.state.itemToAdd}
                        />
                        <FlatButton label="Add Item" onClick={this.addItem} />
                    </form>
                    </CardText>
                    </Card>
                    </aside>
                    <main className="col-xs-12 col-md-8">
                        <div className="row center-xs">
                            {loading ? <LinearProgress mode="indeterminate" /> : undefined}
                            {items.length ? 
                            (<ShoppingList 
                                items={items}
                                onCheckClick={this.onCheck}
                                onDeleteClick={this.onDelete}/>)
                            : undefined
                            }
                        </div>
                    </main>
                </div>
                   <Snackbar
                    open={this.state.snackOpen}
                    message={<span className="row between-xs middle-xs"><ActionCheckCircle style={{fill:'#00E676'}}/>Item added to your list</span>}
                    autoHideDuration={4000}
                    onRequestClose={() => this.setState({ snackOpen: false })}
                />
            </div>
        )
    }
}

export default CreateListPage