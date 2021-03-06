import React, { Component } from 'react'
import base from '../Rebase.config';
import ErrorMessage from './ErrorMessage';
import {
    // Dialog,
    Divider,
    LinearProgress,
    List,
    ListItem,
    Paper,
} from 'material-ui';
class SharedLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shared: [],
            loading: true,

        }
    }
    componentWillMount() {
        const {user} = this.props;
        base.fetch(`${user.uid}/shared`, {
            context: this,
            state: 'shared',
            asArray: true,
            then() {
                this.setState({ loading: false });

            }
        }).then(data => {
            //get users who have shared with you
            const listAggregator = [];
            // data is an array: 💾💾💾
            // [{"friend":"colinrileytaylor@gmail.com",
            // "lists":{"-KZxr6n1W9pb3hGPWKe4":{"index":"1"}},
            // "key":"KGLroDMwOOatxjEkDygfHs1kmHN2"}]
            // loop through and do network calls
            data.forEach((i, dataIndex) => {
                const listIndexArray = Object.keys(i.lists)
                    .map(key => i.lists[key].index)
                    .map(index => Number(index));
                base.fetch(`${i.key}/lists`, {
                    context: this,
                    asArray: true,
                }).then(listData => {
                    if(listData) {                        
                        const sharedListsFromOneFriend = listIndexArray.map(index => {
                            listData[index].owner = i.key;
                            return listData[index];
                        });
                        listAggregator.push(...sharedListsFromOneFriend);
                        //  hack should only run once
                        if(dataIndex === data.length - 1) {
                            this.setState({
                                shared: this.state.shared.concat(sharedListsFromOneFriend),
                            });
                        }
                    }
                });
            })

        }).catch(err => {
            // handle
        });
    }

    render () {
        const {loading, shared} = this.state;
        return (
        <div className="m-t-5">
         {loading ? <LinearProgress mode="indeterminate" /> : undefined}
            {shared.length ?
            <Paper zDepth={1}>
            <List>
                <h4>Shared Lists</h4>
                <Divider/>
                {shared.map(list => (
                    <ListItem 
                        key={list.key}
                        
                        onTouchTap={() => this.props.router.push({ pathname: 'create-list', state: list })}
                        open={list.isOpen}
                        primaryText={list.name}
                        
                    />
                ))}
            </List>
            </Paper>
             : undefined}

        </div>
        )
    }
}

export default SharedLists;