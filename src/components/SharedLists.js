import React, {Component} from 'react'
import base from '../Rebase.config';
import {
        
        Dialog,
        Divider,
        FlatButton,
        IconButton,
        IconMenu,
        LinearProgress,
        List,
        ListItem,
        MenuItem,
        Paper,
        RaisedButton,
        TextField, } from 'material-ui';
class SharedLists extends Component {
    state = {
        shared: [],
        loading: true,
        
    }
    componentWillMount() {
        const {user} = this.props;
        console.log(this.props)
        base.fetch(`${user.uid}/shared`, {
            context: this,
            state: 'shared',
            asArray: true,
            then() {
                //const sorted = this.state.lists.sort((a,b) => a.dateCreated + b.dateCreated);
                this.setState({ loading: false });
                
            }
        }).then(data => {
            console.log('friedns list   ' + JSON.stringify(data))
            const indexArr = data.lists.map(i => i.index);
            console.log(indexArr)
            base.fetch(`${key}/lists`, {
                context: this,
                asArray: true,
            });
            // const shared = data.map(i => {
            //     const listItem = {
            //         friend: i.friend,

            //     }
            // })
        });
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