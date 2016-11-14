import React, {Component} from 'react'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import ShoppingList from './ShoppingList';
import autobind from 'react-autobind';
import firebase from 'firebase';
class CreateListPage extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            items: [{name: 'eggs', id: 1}],
            itemToAdd: '',
            errorText: '',
            user: undefined
        };
        // this.user = undefined;
        this.db = firebase.database();
    }
    componentDidMount() {
     
     firebase.database().ref('/items/').once('value').then((snapshot) => {
        const items = snapshot.val();
        var itemsArr = Object.keys(items).map((item, i) =>{  
            return {name: items[item].name, id: i}
            }   
        )
        console.log(items)
         this.setState({
             items: itemsArr,
         });
        });
    }
    addItem(e) {
        e.preventDefault();
        if(this.state.itemToAdd) {

            const newItem = {
                name: this.state.itemToAdd,
                id: Date.now()
            };
            this.setState({
                items: this.state.items.concat(newItem), 
                itemToAdd: '',
            });
            this.saveItems(newItem)
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
    saveItems(item){
         firebase.database().ref('items/' + item.id).set({
            name: item.name
        })
    }
    render () {
        const {items} = this.state;
        return (
            <div>
                <div className="row center-xs">
                    Create List
                </div>
                <div className="row center-xs">
                <aside className="col-xs-12 col-md-4">
                <Card>
                    <CardHeader
                    title="Shopping List"                    
                    />
                 <CardText>
                    <TextField
                        hintText="List Name"
                    />
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