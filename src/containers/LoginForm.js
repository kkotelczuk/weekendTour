import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import LoadingIndicator from '../components/LoadingIndicator';
import '../style/LoginForm.css';
import firebase from '../firebase';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorEmail: '',
      errorPassword: '',
      isLoading: false,
      touched: false,
      serverErrorMessage: '',      
    };

    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur(event) {
    const { email, password } = this.state;

    if (event.target.id === "email" && email) {
      this.validateEmail(email);
    } else if (event.target.id === "password" && password) {
      this.validatePassword(password);
    }       
    this.setState({ touched: true });    
  }

  handleChange(event) {    
    if (event.target.id === "email") {
      if (this.state.touched) {
        const email = event.target.value;        
        this.validateEmail(email);
      }
      this.setState({
        email: event.target.value, 
      });
    } else if (event.target.id === "password") {
      if (this.state.touched) {
        const password = event.target.value;        
        this.validatePassword(password);
      }
      this.setState({
        password: event.target.value,
      });
    }
  }

  handleLogIn() {
    const { email, password } = this.state;

    this.setState({ 
      touched: true,
      serverErrorMessage: '',           
    }); 

    if (!email) {
      this.setState({
        errorEmail: 'Please write your email'
      });
      return;      
    }

    if (!password) {
      this.setState({
        errorPassword: 'Please write your password'
      })
      return;
    }
    this.setState({
      isLoading: true
    })
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        window.localStorage.setItem('isLoggedIn', true)
        this.props.history.push('/map')
      })
      .catch(error => {
        this.setState({
          serverErrorMessage: 'Wrong password or email'
        })       
      }).then(() => this.setState({isLoading: false}));
    
  }

  handleSignUp() {
    const { email, password } = this.state;

    this.setState({ 
      touched: true,
      serverErrorMessage: '',           
    }); 

    if (this.validateEmail(email) && this.validatePassword(password)) {
      this.setState({
        isLoading: true
      })
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{

        })
        .catch(error => {
          this.setState({
            serverErrorMessage: error.message
          })  
      }).then(() => this.setState({isLoading: false}));      
    }
  }

  validateEmail(email) {
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
    
    return validate;
  }

  validatePassword(password) {
    // let validate = true;
    // const passSpecialCharRE = /[-@!$%^&*()_+|~=`{}[\]:";'<>?,./]/;
    // const capitalsRE = /[A-Z]/;

    // if ( password.length < 8 || !passSpecialCharRE.test(password) || !capitalsRE.test(password) ) {
    //   validate = false;
    //   this.setState({
    //     errorPassword: "Password should have minimum 8 characters with at least one capital letter and one special character"
    //   });
    // } else {
    //   this.setState({
    //     errorPassword: ''
    //   });
    // }
    // return validate;
    return true;
  }

  render() {
    const buttonStyle = {
      margin: 20
    }

    const inputStyle = {
      hight: 48,
      width: 330
    }

    let haveErrors = (this.state.errorEmail || this.state.errorPassword) ? true : false;

    const errorParagraph = <p className="serverError">{this.state.serverErrorMessage}</p>;

    return (
      <div>
        {this.state.isLoading && <LoadingIndicator />}
        <p className="registerHeader">Before move on please log in or sign up</p>
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
            onBlur={this.handleBlur}
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
            onBlur={this.handleBlur}
            /><br />
            {this.state.serverErrorMessage && errorParagraph}          
            <div className="buttons">
              <RaisedButton style={buttonStyle} labelStyle = {{ textTransform: 'capitalize' }} label="Log In" primary={true} onTouchTap={this.handleLogIn} disabled={haveErrors}/>
              <FlatButton style={buttonStyle} labelStyle = {{ textTransform: 'capitalize' }} label="Sign Up" primary={true} onTouchTap={this.handleSignUp} disabled={haveErrors}/>
            </div>            
        </form>
      </div>
    )
  }
}

export default LoginForm;
