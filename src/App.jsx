import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://localhost:3001");
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
  }

  _handlePress = (e) => {
    if (e.key === 'Enter') {
      const newMessage = {username: this.state.currentUser.name, content: e.target.value};
      // const messages = this.state.messages.concat(newMessage)
      // this.setState({messages: messages})
      this.socket.send(JSON.stringify(newMessage));
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = function (event) {
      console.log("Connected to server");
    };

    this.socket.onmessage = (event) => {
      this.state.messages.push(JSON.parse(event.data));
      this.setState({messages: this.state.messages});
    }

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  render() {
    console.log('Rendering <App/>')
    return (
      <div>
        <nav className="navbar" >
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar handlePress={this._handlePress} currentUser={this.state.currentUser} />
      </div>
    );
  }
}
export default App;
