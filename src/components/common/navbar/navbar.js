import React from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';

  const LoginButtons = () => {
    return (
    <div className="login-buttons">
      <Link className="btn btn-primary" to="/login"> Login </Link>
      <Link className="btn btn-primary" to="/signup"> Sign up </Link>
    </div>
  );
};


const Navbar = () => {
  return (
    <div className="navbar flex-row">
      <div className="navbar-left">
        <Link className="title" to="/"> Room scrum </Link>
      </div>
      <div className="navbar-right flex-row">
        {/* action buttons, always visible */}
        <div className="link-section flex-row">
          <Link to="/find/musician"> Find Musician </Link>
          <Link to="/find/events"> Find Events </Link>
          <Link to="/find/bands"> Find Bands </Link>
        </div>
        <div className="dynamic-section">
          <LoginButtons/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;