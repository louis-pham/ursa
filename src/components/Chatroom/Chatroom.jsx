import React from "react";
import socketIOClient from "socket.io-client";

import "./Chatroom.css";

const SOCKETIOENDPOINT = "http://127.0.0.1:3002";
const socket = socketIOClient(SOCKETIOENDPOINT);

class Chatroom extends React.Component {
  state = {
    chatMessages: [],
    message: ""
  }

  componentDidMount() {
    socket.on('add-message', function (data) {
      console.log(this);
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
            <div className="message" key={`msg${idx}`}><b>{msg.name}</b>: {msg.msg}</div>
          )}
        </div>
        <form onSubmit={this.handleEmit}>
          <input id="my-message" placeholder="Enter message..." value={this.state.message} onChange={this.handleChange} />
          <button className="btn btn--secondary"type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default Chatroom;
