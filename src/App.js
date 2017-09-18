import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LoginForm from './containers/LoginForm';

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
          <LoginForm />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
