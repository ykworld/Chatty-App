import React, {Component} from 'react';

class ChatBar extends Component {
  handleClick = (e) => {
    this.props.handlePress(e);
  }
  
  render() {
    console.log('Rendering <ChatBar/>');
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUser.name} onChange={()=>{}} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={(e) => this.handleClick(e)} />
      </footer>
    );
  }
}
export default ChatBar;