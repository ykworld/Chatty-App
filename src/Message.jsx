import React, {Component} from 'react';

class Message extends Component {
  renderMessage() {
    if (this.props.message.type === "incomingMessage") {
      let content = this.props.message.content;
      const myRe = /https?:\/\/.*?\.(?:png|jpg|jpeg|gif)/ig;
      const isFindImg = myRe.test(content);
      if (isFindImg) {
        content = <img className="message-img" src={content}/>
      } 
      return (
        <div className="message">
          <span className="message-username" style={{color: this.props.message.color}}>{this.props.message.username}</span>
          <span className="message-content">
            {content}
          </span>
        </div>
      );
    } else if (this.props.message.type == "incomingNotification") {
      return (
        <div className="message system">
          {this.props.message.content}
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