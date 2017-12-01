import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import LoginForm from './containers/LoginForm';
import Map from './containers/Map';
import NavBar from './components/NavBar';
import User from './containers/User';

import firebase from './firebase';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#2F80ED",
  },
});

const history = createHistory();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(`${user.email} is logged in`);
    // history.push('/map');
  } else {
    history.push('/login');
    console.log('log out');
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={history}>
          <div>
            <NavBar />
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/map" component={Map} />
              <Route path="/user" component={User} />
              <Route component={LoginForm} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;