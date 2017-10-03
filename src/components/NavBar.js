import React from 'react';

import Logo from './Logo.js';
import Logout from './Logout.js';
import Avatar from './Avatar.js';
import Search from '../containers/Search.js';

import '../style/NavBar.css';

const NavBar = () => {
  return (
    <nav>
      <Logo/>
      <div className="floater">
        <Search/>
        <div className='avatar'><Avatar/></div>
        <div className='logout'><Logout/></div>
      </div>
    </nav>
  )
}

export default NavBar;
