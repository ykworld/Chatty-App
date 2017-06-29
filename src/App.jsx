import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://localhost:3001");
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      count: 0
    };
    this.color = "";
  }

  _handlePress = (e) => {
    if (e.key === 'Enter') {
      const newMessage = {type: "postMessage", color: this.color, username: this.state.currentUser.name, content: e.target.value};
      this.sendMessage(newMessage);
      if (this.isNewUser) {
        this.isNewUser = false;
      }
    }
  }
  
  _handleEditUserName = (e) => {
    if (e.key === 'Enter') {
      const username = e.target.value;
      const content = this.state.currentUser.name + " has changed their name to " + username;
      const message = {type: "postNotification", content: content, id: this.id}
      this.setState({currentUser: {name: username}});
      this.sendMessage(message);
    }
  }

  sendMessage = (msg) => {
    this.socket.send(JSON.stringify(msg));
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = function (event) {
      console.log("Connected to server");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      this.id = data.id;
      switch(data.type) {
        case "incomingMessage":
          this.state.messages.push(data);
          this.setState({messages: this.state.messages});
          break;
        case "incomingNotification":
          this.state.messages.push(data);
          this.setState({messages: this.state.messages});
          break;
        case "incomingCount":
          this.setState({count: data.count});
          break;
        case "incomingColor":
          this.color = data.color;
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  render() {
    console.log('Rendering <App/>')
    return (
      <div>
        <nav className="navbar" >
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-count">{this.state.count} users online</span>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar handlePress={this._handlePress} username={this.state.currentUser.name} handleEditUserName={this._handleEditUserName} />
      </div>
    );
  }
}

export default App;
