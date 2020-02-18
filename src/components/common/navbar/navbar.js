import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginDialog } from 'src/components/login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCaretDown, faTruckMonster } from '@fortawesome/free-solid-svg-icons';
import { globalLoginState } from 'src/store/login-state';
import { observer } from 'mobx-react';
import classnames from 'classnames';
import './navbar.scss';


const LoginButtons = () => {
  const [isOpen, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };
  const openDialog = () => {
    setOpen(true);
  }

  return (
    <div className="login-buttons">
      <LoginDialog open={isOpen} onRequestClose={closeDialog}/>
      <Link className="btn btn-secondary" onClick={openDialog}> Login </Link>
      <Link className="btn btn-secondary" to="/register"> Register </Link>
    </div>
  );
};

const Avatar = observer(({loginState}) => {
  const [showDropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!showDropdown);
  const onLogout = () => {
    loginState.username = null;
    document.cookie = 'token=; expires = 01 Jan 1970 00:00:00'; // clear cookie
    setTimeout(() => {
      document.location.href = "/";   
    }, 200);  
  }

  return (
    <div className="account-wrapper">
      <div className="user-account text-white" onClick={toggleDropdown}>
        <span> logged in as {loginState.username}</span>
        <span style={{fontSize: "32px"}}>
          <FontAwesomeIcon icon={faUserCircle}/>
        </span>
        <FontAwesomeIcon icon={faCaretDown}/>
      </div>
      <div
        className={
          classnames({
            "dropdown-menu dropdown list-group": true,
            "show": showDropdown,
          })
        }>
          {/* FIX PATH LATER */}
        <Link className="dropdown-item" to="/profile/me/application"> Applications </Link>
        <Link className="dropdown-item" to="/profile/me/calendar"> Calendar </Link>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item" to="/event/list"> My Events </Link>
        <Link className="dropdown-item" to="/event/search"> Find Events </Link>
        <Link className="dropdown-item" to="/event/create"> Create Event </Link>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item" to="/band/list"> My Bands </Link>
        <Link className="dropdown-item" to="/band/search"> Find Bands </Link>
        <Link className="dropdown-item" to="/band/create"> Create Band </Link>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item" to="/profile/me"> My Profile </Link>
        <div className="text-danger dropdown-item" onClick={onLogout}> Logout </div>
        
      </div>
    </div>
  );
});

const Navbar = observer(({loginState}) => {
  return (
    <div className="navbar flex-row bg-primary shadow-sm">
      <div className="navbar-left">
        <Link className="title text-white" to="/"> Room scrum </Link>
      </div>
      <div className="navbar-right flex-row">
        
        <div className="link-section flex-row">
          <Link className="text-white" to="/find/musician"> Find Musician </Link>
          <Link className="text-white" to="/find/events"> Find Events </Link>
          <Link className="text-white" to="/find/bands"> Find Bands </Link>
          <Link className="text-white" to="/admin/approve-user"> Manage </Link>
        </div>
        <div className="dynamic-section">
          { !loginState.isLoggedIn && <LoginButtons/> }
          { loginState.isLoggedIn && <Avatar loginState={loginState}/> }
        </div>
      </div>
    </div>
  );
});

export default () => <Navbar loginState={globalLoginState}/>;
