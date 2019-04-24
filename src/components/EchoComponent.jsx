import React, { Component } from 'react';

class EchoComponent extends Component {
    state = { 
        messages : [] 
    }

    componentDidMount(){
        // this is an "echo" websocket service for testing pusposes
        this.connection = new WebSocket('ws://localhost:5000/echo');
        // listen to onmessage event
        this.connection.onmessage = evt => { 
            // add the new message to state
            this.setState({
                messages : this.state.messages.concat([ evt.data ])
            })
        };

        // for testing: sending a message to the echo service every 2 seconds, 
        // the service sends it right back
        setInterval( _ =>{
            this.connection.send(Math.random());
        }, 2000 )
    }
    render() {
        // render the messages from state:
        return <ul>{ this.state.messages.map( (msg, idx) => <li key={'msg-' + idx }>{ msg }</li> )}</ul>;
    }
}
 
export default EchoComponent;