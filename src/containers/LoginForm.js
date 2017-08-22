import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import '../style/LoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorEmail: '',
      errorPassword: '',
    };

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    if (event.target.id === "email") {
      this.setState({
        email: event.target.value,
      });
    } else if (event.target.id === "password") {
      this.setState({
        password: event.target.value,
      });
    }
  }

  handleLogIn() {
    //I am not sure if I should give here front end validation,
    //I think in case of log in should be only backend validation

    //from here should go request to DB, same case as in handleSignUp()
    console.log(this.state.email, this.state.password);
  }

  handleSignUp() {
    const { email, password } = this.state;

    if (this.validate(email, password)) {
        //from here should go request to DB, although I am not sure how it should be done
        //in this case, so decided not to guess
        this.setState({
          email: "",
          password: ""
        });
    }
  }

  validate(email, password) {
    let validate = true;
    const emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ( !emailRE.test(email)) {
      validate = false;
      this.setState({
        errorEmail: "Please write valid email"
      });
    } else {
      this.setState({
        errorEmail: ''
      });
    }

    if ( password.length < 8 ) {
      validate = false;
      this.setState({
        errorPassword: "Password should have at least 8 characters"
      });
    } else {
      this.setState({
        errorPassword: ''
      });
    }

    return validate;
  }

  render() {
    const buttonStyle = {
      margin: 20
    }

    const inputStyle = {
      hight: 48,
      width: 330
    }

    return (
      <div>
        <p>Before move on please log in or sign up</p>
        <form className="log-form">
          <TextField
            className="log-input"
            id="email"
            style={inputStyle}
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            hintText="Email"
            errorText={this.state.errorEmail}
            /><br />
          <TextField
            className="log-input"
            id="password"
            style={inputStyle}
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            hintText="Password"
            errorText={this.state.errorPassword}
            /><br />
            <div className="buttons">
              <RaisedButton style={buttonStyle} label="Log In" primary={true} onTouchTap={this.handleLogIn}/>
              <FlatButton style={buttonStyle} label="Sign Up" primary={true} onTouchTap={this.handleSignUp}/>
            </div>
        </form>
      </div>
    )
  }
}

export default LoginForm;
