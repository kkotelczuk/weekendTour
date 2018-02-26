import React, { Component } from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Message from '../components/Message';
import firebase from '../firebase';
import validations from '../helpers/validations';

import '../style/User.css';

class User extends Component {
  state = {
    formReady: false,
    currentUser: null,
    errors: [],
    message: null,
    updateEmail: '',
    updatePassword: '',
    firstName: '',
    lastName: '',
    about: '',
    profileLink: ''
  };

  fields = [
    { name: 'updateEmail', hint: 'E-mail address', type: 'email' },
    { name: 'updatePassword', hint: 'Password', type: 'password' },
    { name: 'firstName', hint: 'First name' },
    { name: 'lastName', hint: 'Last name' },
    { name: 'about', hint: 'About you' },
    { name: 'profileLink', hint: 'Profile link' },
  ];

  validations = {
    updateEmail: this._validateEmail,
    updatePassword: this._validatePassword,
    firstName: this._validateFirstName,
    lastName: this._validateLastName
  };

  async componentDidMount() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(!isLoggedIn) {
      this.props.history.push('/login');
    }

    const user = await firebase.auth().currentUser;
    if(user) {
      this.setState({currentUser: user})
      this._loadUserData();
    }
    console.log(user)
    
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (!user) return;
    //   this.setState({ 
    //     currentUser: user,
    //     updateEmail: user.email
    //   });
    //   this._loadUserData();
    // })
  }

  handleClick(event) {
    const { currentUser, updateEmail, updatePassword, firstName, lastName, about, profileLink }  = this.state;
    const ref = firebase.database().ref(`users/${currentUser.uid}`);
    ref.once('value')
      .then(async (snapshot) => {
        const value = {
          firstName: firstName || '',
          lastName: lastName || '',
          about: about || '',
          profileLink: profileLink || ''
        };
        try {
          await ref.set(value);
          this.updateEmailAndPassword(updateEmail, updatePassword);
          this.setMessage('Your data has been saved!');
        } catch (error) {
          this.setMessage('Could not save your data due to an error.');
        }
      });
  }

  handleChange(event) {
    const newState = {};
    const { id, value } = event.target;
    newState[id] = value;
    this.validate(id, value);
    this.setState(newState);
  }

  validate(field, value) {
    if (!this.validations[field]) return;
    let errors = this.state.errors;
    errors[field] = this.validations[field](value);
    this.setState({ errors: errors });
  }

  setMessage(message) {
    this.setState({ message: message });
  }

  updateEmailAndPassword(updateEmail, updatePassword) {
    firebase.auth().currentUser.getIdToken(true).then(async (token) => {
      try {
        if (updateEmail || updatePassword) {
          const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=${process.env.REACT_APP_APIKEY}`;
          const result = await axios.post(url, {
            idToken: token,
            email: updateEmail,
            password: updatePassword,
            returnSecureToken: true
          });
        }
      } catch (error) {
        this.setMessage('Failed changing email or password!');
      }
    });
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

    console.log(this.state.currentUser)

    return (
      <div className="user">
        <p>Your account</p>
        { this.state.currentUser && 
          <form className="account-form">
            <Message text={this.state.message} time={5000} />
            { this.fields.map((e) => {
              return (
                <TextField
                  key={e.name}
                  id={e.name}
                  type={e.type || null}
                  style={inputStyle}
                  value={this.state[e.name]}
                  onChange={this.handleChange.bind(this)}
                  hintText={e.hint}
                  errorText={this.state.errors[e.name]}
                />
              );
            })}
            <FlatButton
              style={buttonStyle}
              backgroundColor="#2F80ED"
              labelStyle={labelStyle}
              label="Save"
              onClick={this.handleClick.bind(this)}
              disabled={this.state.errors.length !== 0}
            />
          </form>
        }
      </div>
    );
  }

  _validateEmail(value) {
    let error;
    if (!validations.required(value)) {
      error = 'The e-mail address is required.';
    } else if (!validations.email(value)) {
      error = 'The e-mail address is invalid.';
    } else {
      error = null;
    }
    return error;
  }

  _validatePassword(value) {
    let error;
    if (!validations.required(value)) {
      error = 'The password is required.';
    } else if (!validations.password(value)) {
      error = 'The password must contain at least one big letter, one special character and be at least 8 characters long.';
    } else {
      error = null;
    }
    return error;
  }

  _validateFirstName(value) {
    let error = !validations.name(value)
      ? 'The first name is invalid.' : null;
    return error;
  }

  _validateLastName(value) {
    let error = !validations.name(value)
      ? 'The last name is invalid.' : null;
    return error;
  }

  _validateProfileLink(value) {
    let error = !validations.url(value)
      ? 'The profile URL is invalid.' : null;
    return error;
  }
  
  _loadUserData() {
    const { currentUser } = this.state;
    if (!currentUser) return;

    const ref = firebase.database().ref(`users/${currentUser.uid}`);
    ref.once('value')
      .then((snapshot) => {
        const value = snapshot.val();
        if (!value) return;
        let newState = { ...this.state };
        newState = {
          firstName: value.firstName || '',
          lastName: value.lastName || '',
          about: value.about || '',
          profileLink: value.profileLink || ''
        };
        this.setState(newState);
      });
  }
}

export default User;