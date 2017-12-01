import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import firebase from '../firebase';

import '../style/User.css';

class User extends Component {
  state = {
    currentUser: null,
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    about: '',
    profile_link: ''
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) return;
      this.setState({ currentUser: user.uid });
    })
  }

  handleClick(event) {
    console.log('Handle click');
    const ref = firebase.database().ref('users/' + this.state.currentUser.uid);
    ref.once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        if (value !== null) {
        } else {
        }
      });
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  render() {
    const labelStyle = {
      color: '#FFFFFF',
      textTransform: 'none'
    };

    const inputStyle = {
      margin: '5px 0',
      width: '100%'
    };

    const buttonStyle = {
      float: 'right',
      clear: 'both'
    };

  
    const fields = [
      { name: 'email', hint: 'E-mail address' },
      { name: 'password', hint: 'Password', type: 'password' },
      { name: 'first_name', hint: 'First name' },
      { name: 'last_name', hint: 'Last name' },
      { name: 'about', hint: 'About you' },
      { name: 'profile_link', hint: 'Profile link' },
    ]

    return (
      <div className="user">
        <p>Your account</p>
        { this.state.currentUser && 
          <form className="account-form">
            { fields.map((e) => {
              return (<TextField
                key={e.name}
                id={e.name}
                type={e.type || null}
                style={inputStyle}
                value={this.state[e.name]}
                onChange={this.handleChange.bind(this)}
                hintText={e.hint}
              />);
            })}
            <FlatButton
              style={buttonStyle}
              backgroundColor="#2F80ED"
              labelStyle={labelStyle}
              label="Save"
              onClick={this.handleClick.bind(this)}
            />
          </form>
        }
      </div>
    );
  }
}

export default User;