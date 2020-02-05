import React, { useState } from 'react';
import './navbar.scss';
import { Link as Button } from 'react-router-dom';
import { LoginDialog } from 'src/components/login';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { logout } from 'src/store/login-state';
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
      <Button className="btn btn-primary" onClick={openDialog}> Login </Button>
      <Button className="btn btn-primary" to="/signup"> Sign up </Button>
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
    <div>
      <div className="user-account" onClick={toggleDropdown}>
        <span> logged in as {username}</span>
        <span style={{fontSize: "32px"}}>
          <FontAwesomeIcon icon={faUserCircle}/>
        </span>
      </div>
      <div 
        onClick=""
        className="dropdown">
        <div className="text-danger" onClick={onLogout}> Logout </div>
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
    <div className="navbar flex-row">
      <div className="navbar-left">
        <Button className="title" to="/"> Room scrum </Button>
      </div>
      <div className="navbar-right flex-row">
        
        <div className="link-section flex-row">
          <Button to="/find/musician"> Find Musician </Button>
          <Button to="/find/events"> Find Events </Button>
          <Button to="/find/bands"> Find Bands </Button>
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