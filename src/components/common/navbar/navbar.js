import React, { useState } from 'react';
import './navbar.scss';
import { Link as Button } from 'react-router-dom';
import { LoginDialog } from 'src/components/login';

const LoginButtons = () => {
  const [isOpen, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };
  const openDialog = () => {
    setOpen(true);
  };

  return (
    <div className='login-buttons'>
      <LoginDialog open={isOpen} onRequestClose={closeDialog} />
      <Button className='btn btn-primary' onClick={openDialog}>
        Login
      </Button>
      <Button className='btn btn-primary' to='/signup'>
        Sign up
      </Button>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className='navbar flex-row'>
      <div className='navbar-left'>
        <Button className='title' to='/'>
          Room scrum
        </Button>
      </div>
      <div className='navbar-right flex-row'>
        {/* action buttons, always visible */}
        <div className='link-section flex-row'>
          <Button to='/find/musician'> Find Musician </Button>
          <Button to='/find/events'> Find Events </Button>
          <Button to='/find/bands'> Find Bands </Button>
        </div>
        <div className='dynamic-section'>
          <LoginButtons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
