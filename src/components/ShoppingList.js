import React, {Component} from 'react'

import {Checkbox, List, ListItem, IconButton }from 'material-ui/';
import Delete from 'material-ui/svg-icons/action/delete';
// import BlankCheck from 'material-ui/svg-icons/toggle/check-box-outline-blank';
// import Checkbox from 'material-ui/svg-icons/toggle/check-box';
import MobileTearSheet from './MobileTearSheet';
import autobind from 'react-autobind';

const DeleteButton = (props) => (
    <IconButton onClick={props.onDeleteClick}>
        <Delete/>
    </IconButton>
);

class ShoppingList extends Component {
    constructor(props) {
        super(props);
        autobind(this);
    }
    onDeleteClick(item) {
        this.props.onDeleteClick(item);
    }
    onCheckClick(item) {
        this.props.onCheckClick(item);
    }
    isCompleted(item) {
        return item.completed ? 'line-through' : '';
    }
    render() {
        return (
            <MobileTearSheet>
                <List>
                {this.props.items.map((item, index) => {
                    return (
                    <ListItem
                    key={index}
                    leftCheckbox={<Checkbox />}
                    primaryText={item.name}
                    rightIconButton={<IconButton onClick={()=> this.onDeleteClick(item)}>
                                        <Delete/>
                                    </IconButton>}
                />
                    
                )})}
                </List>
            </MobileTearSheet>
        );
    }
}

export default ShoppingList;