import React from 'react'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import MobileTearSheet from './MobileTearSheet';
const ShoppingList = (props) => {
 
    return (
        <MobileTearSheet>
            <List>
            {props.items.map((item, index) => (
                <div>
                    <ListItem primaryText={item.name} key={index} />
                    <Divider/>
                </div>
            ))}
            </List>
        </MobileTearSheet>
    )
}

export default ShoppingList;