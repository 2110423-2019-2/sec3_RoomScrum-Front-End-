import React, {useRef} from 'react'
import Modal from 'react-modal';
import './login-dialog.scss';
import { Link } from 'react-router-dom';
import request from 'superagent';
import config from 'src/config'

Modal.setAppElement('#root');



const joinCookie = (cookie, newCookie) => {
  return [newCookie, ...cookie.split(';')].join('; ');
}


const LoginDialog = ({open, onRequestClose}) => {

  const usernameInput = useRef();
  const passwordInput = useRef(); 

  const login = () => {
    request.post(`${config.API_URL}/auth/login`)
    .send({
      username: usernameInput.current.value,
      password: passwordInput.current.value,
    })
    .then(res => {
      const { token } = JSON.parse(res.text);
      if (token) {
        document.cookie = joinCookie(document.cookie, `token=${token}`);
        alert(`login ok ${token}`);
      } else {
        alert('invalid response from server')
      }
    }) 
    .catch(err => {
      alert('wrong password')
    });
  }

  // const checkState = () => {
  //   request.get(`${config.API_URL}/auth/status`)
  //   .withCredentials()
  //   .then(res => {
  //     console.log('status:', JSON.parse(res.text));
  //   })
  //   .catch(err => {
  //     console.log('status: not logged in');
  //   })
  // }

  return (
    <Modal isOpen={open} onRequestClose={onRequestClose} className="login-dialog shadow">
      <div className="column">
        <h1 className="title text-center"> Login </h1>
        <div className="input">
          <label> Username </label>
          <input ref={usernameInput} type="text"/>
        </div>
        <div className="input">
          <label> Password </label>
          <input ref={passwordInput} type="password"/>
        </div>
        <button className="btn btn-primary" onClick={login}> Login </button>
        {/* <button className="btn btn-primary" onClick={checkState}> check state </button> */}
        <Link to="/register" className="text-center"> No account, create an account now! </Link>
      </div>
    </Modal>
  )
};

export default LoginDialog;