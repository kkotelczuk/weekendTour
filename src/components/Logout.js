import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import firebase from '../firebase';

const Logout = () => {
  const handleLogout = () => {
    firebase.auth().signOut().then(function() {
      alert('Logout was succesfull');
    }).catch(function(error) {
      console.log('something went wrong');
    });
  }

  return (
      <FlatButton
        label="Log out"
        primary={true}
        onTouchTap={handleLogout}
        labelStyle = {{ textTransform: 'none', letterSpacing: '.6px' }}
      />
  );
}

export default Logout;
