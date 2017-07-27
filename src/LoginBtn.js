import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

class LoginBtn extends Component {
  render() {
      const avatar = 'avatar.svg';

    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <Avatar
          src={avatar}
          size={44}
          style={{borderRadius: 5,
                  backgroundColor: 'transparent',
                  paddingLeft: 40
                  }}
        />
        <FlatButton
          onClick={() => alert('Zalogowano!')}
          label="Log in"
          style={{color: "#2F80ED", width: 95}}
          labelStyle={{letterSpacing: 0.5}}
        />
      </div>
    )
  }
}
export default LoginBtn;
