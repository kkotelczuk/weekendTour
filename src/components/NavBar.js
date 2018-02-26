import React from 'react';
import { Link } from 'react-router-dom'

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
        <Link to="/user" className='avatar'><Avatar/></Link>
        <div className='logout'><Logout/></div>
      </div>
    </nav>
  )
}

export default NavBar;
