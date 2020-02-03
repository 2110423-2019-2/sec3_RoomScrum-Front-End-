import React from 'react'
import Modal from 'react-modal';
import './login-dialog.scss';
import { Link } from 'react-router-dom';

Modal.setAppElement('#root');

const LoginDialog = ({open, onRequestClose}) => {
  return (
    <Modal isOpen={open} onRequestClose={onRequestClose} className="login-dialog shadow">
      <div className="column">
        <h1 className="title text-center"> Login </h1>
        <div className="input">
          <label> Username </label>
          <input type="text"/>
        </div>
        <div className="input">
          <label> Password </label>
          <input type="password"/>
        </div>
        <button className="btn btn-primary"> Login </button>
        <Link to="/register" className="text-center"> No account, create an account now! </Link>
      </div>
    </Modal>
  )
};

export default LoginDialog;