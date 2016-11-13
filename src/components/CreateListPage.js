import React, {Component} from 'react'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ShoppingList from './ShoppingList';
import autobind from 'react-autobind';
class CreateListPage extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state = {
            items: [],
            itemToAdd: '',
            errorText: '',
        }
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
    render () {
        const {items} = this.state;
        return (
            <div>
                <div className="row center-xs">
                    Create List
                </div>
                <div className="row center-xs">
                <aside className="col-xs-10">
                <Card>
                    <CardHeader
                    title="Shopping List"                    
                    />
                 <CardText>
                    <TextField
                        hintText="List Name"
                    />
                    <form onSubmit={this.addItem}>
                        <TextField
                            errorText={this.state.errorText}
                            hintText="Item"
                            onChange={this.handleItemChange}
                            value={this.state.itemToAdd}
                        />
                        <FlatButton label="Add Item" onClick={this.addItem} />
                    </form>
                    {items.length ? 
                     (<ShoppingList items={items}/>)
                     : undefined
                    }
                </CardText>
                </Card>
                </aside>
                </div>
                
            </div>
        )
    }
}

export default CreateListPage