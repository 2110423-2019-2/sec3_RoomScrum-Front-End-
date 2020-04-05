import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginDialog from 'src/components/login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faCaretDown,
  faTruckMonster,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { globalLoginState } from 'src/store/login-state';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import './navbar.scss';
import NotificationMenu from 'src/components/notification';
import DropdownMenu from './dropdown-menu';

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
      <Link className='btn btn-secondary' onClick={openDialog}>
        Login{' '}
      </Link>
      <Link className='btn btn-secondary' to='/register'>
        {' '}
        Register{' '}
      </Link>
    </div>
  );
};

const Avatar = observer(({ loginState }) => {
  const [showDropdown, setDropdown] = useState(false);
  const [showNotif, setNotif] = useState(false);
  const toggleDropdown = () => setDropdown(!showDropdown);
  const toggleNotif = () => setNotif(!showNotif);

  const onLogout = () => {
    loginState.username = null;
    document.cookie = 'token=; expires = 01 Jan 1970 00:00:00'; // clear cookie
    setTimeout(() => {
      document.location.href = '/';
    }, 200);
  };

  return (
    <div className='account-wrapper'>
      <div className='user-account text-white'>
        <div>
          <FontAwesomeIcon icon={faBell} onClick={toggleNotif} />
        </div>
        <span> logged in as {loginState.username}</span>
        <span style={{ fontSize: '32px' }}>
          <FontAwesomeIcon icon={faUserCircle} onClick={toggleDropdown} />
        </span>
        <FontAwesomeIcon icon={faCaretDown} onClick={toggleDropdown} />
      </div>
      <NotificationMenu show={showNotif} onClose={() => setNotif(false)}/>
      {/* dropdown menu */}
      <DropdownMenu show={showDropdown} onClose={() => setDropdown(false)}/>
    </div>
  );
});

const Navbar = observer(({ loginState }) => {
  return (
    <div className="navbar flex-row shadow-sm">
      <div className="navbar-left">
        <Link className="title text-white" to="/">
          {" "}
          Room scrum{" "}
        </Link>
      </div>
      <div className='navbar-right flex-row'>
        <div className='link-section flex-row'>
          <Link className='text-white' to='/find/musician'>
            {' '}
            Find Musician{' '}
          </Link>
          <Link className='text-white' to='/find/events'>
            {' '}
            Find Events{' '}
          </Link>
          <Link className='text-white' to='/find/bands'>
            {' '}
            Find Bands{' '}
          </Link>
          <Link className='text-white' to='/admin/approve-user'>
            {' '}
            Manage{' '}
          </Link>
        </div>
        <div className='dynamic-section'>
          {!loginState.isLoggedIn && <LoginButtons />}
          {loginState.isLoggedIn && <Avatar loginState={loginState} />}
        </div>
      </div>
    </div>
  );
});

export default () => <Navbar loginState={globalLoginState} />;
