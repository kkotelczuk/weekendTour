import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

//import LoginForm from './containers/LoginForm';
import Map from './containers/Map';
import NavBar from './components/NavBar';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: "#2F80ED",
  },
});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <NavBar />
          <Map />
        { /* <LoginForm /> */}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
