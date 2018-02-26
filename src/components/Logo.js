import React from 'react';
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src='./images/Logo.svg' alt="logo" />
    </Link>
  );
}

export default Logo;
