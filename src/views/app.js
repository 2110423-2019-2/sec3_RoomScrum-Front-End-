import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './login';
import NotFoundPage from './not-found';
import Home from './home';
import { connect } from 'react-redux';
import { login } from 'src/store/login-state';
import request from 'superagent';

import config from 'src/config';

const App = ({setUsername}) => {
  const attempt = useRef(false);
  
  if (!attempt.current) {
    attempt.current = true;
    request.get(`${config.API_URL}/auth/status`)
      .withCredentials()
      .then(res => {
        const {username} = JSON.parse(res.text);
        if (username){
          setUsername(username);
          console.log("logged in as", username);
        }
      })
      .catch(err => {
      })
  }

  return (
      <Router>
        <Switch>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/">
            <NotFoundPage/>
          </Route>
        </Switch>
      </Router>
  );
};

const dispatchToProps = dispatch => ({
  setUsername: username => dispatch(login(username)),
});

export default connect(
    null,
    dispatchToProps,
)(App);