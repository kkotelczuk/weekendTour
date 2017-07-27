import React, {Component} from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import LoginBtn from './LoginBtn';
import Search from 'material-ui/svg-icons/action/search';

class Navbar extends Component {
  render () {

    return (
      <div>
        <Toolbar style={{backgroundColor: "#F2994A", height: '70px'}}>
          <img src={"Logo.svg"} alt="weekend tour app"/>
          <ToolbarGroup>
            <Search style={{width: 24, height: 24, color: '#4F4F4F'}} />
            <TextField
              hintText="Search"
              onChange={(e) => console.log(e.target.value)}
              onKeyPress={this.handleEnter}
              style={{
                paddingLeft: 8
              }}
              underlineStyle={{
                borderBottom: '0.5px solid #828282'
              }}
              underlineFocusStyle={{
                borderBottom: '2px solid #2F80ED'
              }}
            />
            <LoginBtn />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
  handleEnter = (e) => {
    if(e.charCode === 13) {
      console.log('Search', e.target.value);
    }
  }
}



export default Navbar;
