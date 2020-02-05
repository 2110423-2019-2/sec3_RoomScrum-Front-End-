import React, { useState } from 'react';
import './navbar.scss';
import { Link } from 'react-router-dom';
import { LoginDialog } from 'src/components/login';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCaretDown, faTruckMonster } from '@fortawesome/free-solid-svg-icons';
import { logout } from 'src/store/login-state';
import classname from 'classname';
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
      <Link className="btn btn-secondary" to="/signup"> Sign up </Link>
    </div>
  );
};

const _Avatar = ({username, logout}) => {
  const [showDropdown, setDropdown] = useState(false);
  const toggleDropdown = () => setDropdown(!showDropdown);

  const onLogout = () => {
    logout();
    document.cookie = "token=";
    document.location.href = "/";
  }

  return (
    <div className="account-wrapper">
      <div className="user-account text-white" onClick={toggleDropdown}>
        <span> logged in as {username}</span>
        <span style={{fontSize: "32px"}}>
          <FontAwesomeIcon icon={faUserCircle}/>
        </span>
        <FontAwesomeIcon icon={faCaretDown}/>
      </div>
      <div
        className={
          classname({
            "dropdown border border-dark rounded shadow p-1": true,
            "show": showDropdown,
          })
        }>
        <div className="text-danger dropdown-item" onClick={onLogout}> Logout </div>
      </div>
    </div>
  );
}

const Avatar = connect(
  state => {
    return {
      username: state.loginState.username
    };
  },
  dispatch => ({
    logout: () => dispatch(logout()),
  })
)(_Avatar);


const Navbar = ({isLoggedIn, username}) => {
  console.log(isLoggedIn, username);
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
        </div>
        <div className="dynamic-section">
          { !isLoggedIn && <LoginButtons/> }
          { isLoggedIn && <Avatar username={username}/> }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { loginState } = state;
  return {
    isLoggedIn: !!loginState.username,
    username: loginState.username,
  };
}


export default connect(
  mapStateToProps,
  null,
)(Navbar);