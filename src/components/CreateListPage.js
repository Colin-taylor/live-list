import React, {
    Component
} from 'react'
import uuid from 'node-uuid'; 
// import FlatButton from 'material-ui/FlatButton';
import {
    Card,
    CardText,
    CardTitle,
    Divider,
    FlatButton,
    TextField,
} from 'material-ui';

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
        };
        this.db = firebase.database();
        console.log('listname is' + JSON.stringify(this.state.list))
        //debugger;
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            
            if (user) {
                this.setState({
                    user
                });
                base.syncState(`${user.uid}/lists/${this.state.list.key}/items`, {
                    context: this,
                    state: 'items',
                    asArray: true,
                });
            };
        });
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
        const {items, list} = this.state;
        console.log('list is;;;;;'+list)
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
                
            </div>
        )
    }
}

export default CreateListPage