import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(`${user.email} is logged in`);
  } else {
    console.log('log out');
  }
});
