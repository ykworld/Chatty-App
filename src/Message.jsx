import React, {Component} from 'react';

class Message extends Component {
  renderMessage() {
    let { color, username, content, type} = this.props.message;
    
    // change DOM depends on message type
    if (type === "incomingMessage") {
      // use regex to check img url pattern
      const myRe = /https?:\/\/.*?\.(?:png|jpg|jpeg|gif)/ig;
      const isFindImg = myRe.test(content);
      // add img element if regex return true
      if (isFindImg) {
        content = <img className="message-img" src={content}/>
      } 

      return (
        <div className="message">
          <span className="message-username" style={{color: color}}>{username}</span>
          <span className="message-content">
            {content}
          </span>
        </div>
      );
    } else if (type == "incomingNotification") {
      return (
        <div className="message system">
          {content}
        </div>
      );
    }
  }

  render() {
    console.log('Rendering <Message/>')
    return (
      this.renderMessage()
    );
  }
}
export default Message;