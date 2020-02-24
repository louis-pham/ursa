import React from "react";
import socketIOClient from "socket.io-client";

import "./Chatroom.css";

// const SOCKETIOENDPOINT = process.env.REACT_APP_SOCKETIOENDPOINT || "http://localhost:3002";
const socket = socketIOClient("http://localhost:3002", {transports: ['websocket', 'polling', 'flashsocket']});

class Chatroom extends React.Component {
  state = {
    chatMessages: [],
    message: ""
  }

  componentDidMount() {
    socket.on('add-message', function (data) {
      this.setState({
        chatMessages: [...this.state.chatMessages, data]
      });
    }.bind(this));
  }

  handleEmit = e => {
    e.preventDefault();
    socket.emit('add-message', {
      name: this.props.user.username,
      msg: this.state.message
    });
    this.setState({
      message: ""
    });
  }

  handleChange = e => {
    this.setState({
      message: e.target.value
    });
  }

  render() {
    return (
      <div className="Chatroom">
        <div className="messages">
          {this.state.chatMessages.map((msg, idx) =>
            <div className="message" key={`msg${idx}`}><b style={{ color: `#${intToRGB(hashCode(msg.name))}` }}>{msg.name}</b>: {msg.msg}</div>
          )}
        </div>
        <form onSubmit={this.handleEmit}>
          <label htmlFor="my-message" className="my-name" style={{ color: `#${intToRGB(hashCode(this.props.user.username))}` }}>{this.props.user.username}</label>
          <input id="my-message" placeholder="Enter message..." value={this.state.message} onChange={this.handleChange} />
          <button className="btn btn--secondary"type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default Chatroom;

// helper functions
// https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript

function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
}

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}
