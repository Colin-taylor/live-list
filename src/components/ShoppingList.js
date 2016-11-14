import React, {Component} from 'react'
import {List, ListItem} from 'material-ui/List';
// import Divider from 'material-ui/Divider';
import Delete from 'material-ui/svg-icons/action/delete';
import MobileTearSheet from './MobileTearSheet';
import autobind from 'react-autobind';


class ShoppingList extends Component {
    constructor(props) {
        super(props);
        autobind(this);
    }
    onDeleteClick(item) {
        this.props.onDeleteClick(item);
    }
    render() {
        return (
            <MobileTearSheet>
                <List>
                {this.props.items.map((item, index) => (
                        <ListItem 
                        primaryText={item.name} key={index}>
                        <div className="row end-xs">
                            <Delete
                            id={index} 
                            onClick={() => this.onDeleteClick(item)}/>
                        </div>
                        </ListItem>
                ))}
                </List>
            </MobileTearSheet>
        );
    }
}

export default ShoppingList;