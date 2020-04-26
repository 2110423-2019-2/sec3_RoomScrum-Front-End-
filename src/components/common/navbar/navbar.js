import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginDialog from "src/components/login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faTruckMonster,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { globalLoginState } from "src/store/login-state";
import { observer } from "mobx-react";
import "./navbar.scss";
import NotificationMenu from "src/components/notification";
import DropdownMenu from "./dropdown-menu";
import NavIcon from "./components/nav-icon";
import config from "src/config";
import Image from "react-image";
import { RoleGuard } from "../guard";

const LoginButtons = () => {
  const [isOpen, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
  };
  const openDialog = () => {
    setOpen(true);
  };

  return (
    <div className="login-buttons">
      <LoginDialog open={isOpen} onRequestClose={closeDialog} />
      <Link className="btn btn-secondary" onClick={openDialog}>
        Login
      </Link>
      <Link className="btn btn-secondary" to="/register">
        Register
      </Link>
    </div>
  );
};

const Avatar = observer(({ loginState }) => {
  const onLogout = () => {
    loginState.username = null;
    document.cookie = "token=; expires = 01 Jan 1970 00:00:00"; // clear cookie
    setTimeout(() => {
      document.location.href = "/";
    }, 200);
  };

  return (
    <div className="account-wrapper">
      <div className="user-account text-white">
        <span> {loginState.username}</span>
        <span className="avatar-container">
          {// defer load until we have login state
          loginState.userId && (
            <Image
              className="avatar"
              src={[
                `${config.API_URL}/user/profile-pic/${loginState.userId}`,
                "https://i.pravatar.cc/64",
              ]}
              loader={() => <div className="avatar"></div>}
            />
          )}
        </span>
        <NavIcon icon={faBell} id="notification-icon">
          <NotificationMenu show={true} />
        </NavIcon>
        <NavIcon icon={faCaretDown} id="notification-icon">
          <DropdownMenu onLogout={onLogout} />
        </NavIcon>
      </div>
    </div>
  );
});

const Navbar = observer(({ loginState }) => {
  return (
    <div className="navbar flex-row shadow-sm">
      <div className="navbar-left">
        <Link className="title text-white" to="/">
          Finmus
        </Link>
      </div>
      <div className="navbar-right flex-row">
        <div className="link-section flex-row">
          {/* <Link className='text-white' to='/find/musician'>
            Find Musician
          </Link> */}
          <Link className="text-white" to="/find/events">
            Find Events
          </Link>
          {/* <Link className='text-white' to='/find/bands'>
            Find Bands
          </Link> */}
          <RoleGuard role="Hirer">
            <Link className="text-white" to="/event/create">
              Create Event
            </Link>
          </RoleGuard>
          <RoleGuard role="Admin">
            <Link className="text-white" to="/admin/approve-user">
              Manage
            </Link>
          {/* </RoleGuard> */}
          {/* <RoleGuard role="Hirer"> */}
            <Link className='text-white' to='/event/create'>
              <FontAwesomeIcon icon={faPlus} className="mr-2"/>
              New Event
            </Link>
          {/* </RoleGuard> */}
        </div>
        <div className="dynamic-section">
          {!loginState.isLoggedIn && <LoginButtons />}
          {loginState.isLoggedIn && <Avatar loginState={loginState} />}
        </div>
      </div>
    </div>
  );
});

export default () => <Navbar loginState={globalLoginState} />;
