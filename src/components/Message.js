import React, { Component } from 'react';
import '../style/Message.css';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      show: false,
      time: props.time || 5000
    };
  }

  componentWillReceiveProps(props) {
    console.log('RECEIVED NEW PROPS ', props);

    this.setState({ message: props.text, show: !!props.text });

    const timeOut = setTimeout(() => {
      this.clear();
    }, this.state.time);
  }

  shouldComponentUpdate(nextState) {
    return this.state !== nextState.text || this.show !== nextState.show;
  }

  clear() {
    const newState = {
      message: '',
      show: false
    };
    this.setState({ show: false });
  }

  render() {
    let messageClasses = ['message']
    if (this.state.show) {
      messageClasses.push('message--shown');
    }

    return (this.state.show &&
      <div className={messageClasses.join(' ')}>
        {this.state.message}
        <span className="message__close" onClick={this.clear.bind(this)}>&times;</span>
      </div>
    );
  }
}