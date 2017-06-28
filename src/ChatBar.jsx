import React, {Component} from 'react';

class ChatBar extends Component {  
  render() {
    console.log('Rendering <ChatBar/>');
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.username} onChange={(e) => this.props.handleChange(e)} onKeyPress={(e) => this.props.handleEditUserName(e)} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={(e) => this.props.handlePress(e)} />
      </footer>
    );
  }
}
export default ChatBar;