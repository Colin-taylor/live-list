import React from 'react'
import {Dialog, FlatButton} from 'material-ui';
const ErrorMessage = (props) => {
    return (
        <Dialog
            title="Error"
            actions={[<FlatButton
                        label="Close"
                        primary={true}
                        keyboardFocused={true}
                        onTouchTap={props.handleClose} />
                        ]}
            modal={false}
            open={props.open}
            onRequestClose={props.handleClose}
        >
        {props.text}
        </Dialog>
        
    )
}


export default ErrorMessage