import React, { Component } from 'react';
import constants from '../constants/constants';

class EchoComponent extends Component {
    state = { 
        message : "",
        size: 0,
        number: parseInt(Math.random() * 10, 10)
    }

    componentDidMount() {
        const id = 1;
        // this is an "echo" websocket service for testing pusposes
        this.connection = new WebSocket(constants.WS_URL + id);
        // listen to onmessage event
        this.connection.onmessage = evt => {
            // add the new message to state
            this.setState({
                message: evt.data
            })
        };

        // for testing: sending a message to the echo service every 2 seconds, 
        // the service sends it right back
        setInterval(() => {
            this.connection.send("Message " + this.state.number);
        }, 2000);
    }
    render() {
        // render the messages from state:
        //return <ul>{ this.state.messages.map( (msg, idx) => <li key={'msg-' + idx }>{ msg }</li> )}</ul>;
        return <div>{this.state.message}</div>;
    }
}
 
export default EchoComponent;