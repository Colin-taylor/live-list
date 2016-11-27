import React, {Component} from 'react'

// import Divider from 'material-ui/Divider';
import Delete from 'material-ui/svg-icons/action/delete';
import BlankCheck from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import Checkbox from 'material-ui/svg-icons/toggle/check-box';
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
    onCheckClick(item) {
        this.props.onCheckClick(item);
    }
    isCompleted(item) {
        return item.completed ? 'line-through' : '';
    }
    render() {
        return (
            <MobileTearSheet>
                <ul className="list">
                {this.props.items.map((item, index) => (
                        <li key={index} className="row between-xs">
                        {item.completed ? 
                            <Checkbox onClick={() => this.onCheckClick(item)}/> 
                        : 
                        <BlankCheck
                        onClick={() => this.onCheckClick(item)}
                        />
                        }
                            <span className={this.isCompleted(item)}>{item.name}</span>
                            <Delete
                            className="delete-icon" 
                            onClick={() => this.onDeleteClick(item)}/>
                        
                        </li>
                ))}
                </ul>
            </MobileTearSheet>
        );
    }
}

export default ShoppingList;