import React, { Component } from 'react'
import base from '../Rebase.config';
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
        console.log(this.props)
        base.fetch(`${user.uid}/shared`, {
            context: this,
            state: 'shared',
            asArray: true,
            then() {
                this.setState({ loading: false });

            }
        }).then(data => {
            console.log('friedns list   ' + JSON.stringify(data))
            const listAggregator = [];
            // data is an array: 💾💾💾
            // [{"friend":"colinrileytaylor@gmail.com",
            // "lists":{"-KZxr6n1W9pb3hGPWKe4":{"index":"1"}},
            // "key":"KGLroDMwOOatxjEkDygfHs1kmHN2"}]
            data.forEach(i => {
                const listIndexArray = Object.keys(i.lists)
                    .map(key => i.lists[key].index)
                    .map(index => parseInt(index));
                base.fetch(`${i.key}/lists`, {
                    context: this,
                    asArray: true,
                }).then(data => {
                    console.log(`data is::: ${JSON.stringify(data[1])}`)
                    const sharedListsFromOneFriend = listIndexArray.map(index => {
                        data[index].owner = i.key;
                        return data[index];
                    });
                    listAggregator.push(...sharedListsFromOneFriend)
                    
                });
            })
            // temporary hack
            setTimeout(() => this.setState({ shared: listAggregator }), 500);
        }).catch(err => console.error(err));
    } 
    render () {
        const {loading, shared, user} = this.state;
        return (
        <div className="col-xs-12 col-lg-6">
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