import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NotFoundPage from './not-found';
import Home from './home';
import request from 'superagent';

import config from 'src/config';
import { globalLoginState } from 'src/store';
import EventPages from './event';

import ProfilePage from './profile'

const App = ({loginState}) => {
  const attempt = useRef(false);
  
  if (!attempt.current) {
    attempt.current = true;
    request.get(`${config.API_URL}/auth/status`)
      .withCredentials()
      .then(res => {
        const {username} = JSON.parse(res.text);
        if (username){
          loginState.username = username;
          console.log("logged in as", username);
        }
      })
      .catch(err => {
      })
  }

  return (
      <Router>
        <Switch>
          <Route path='/event'>
            <EventPages/>
          </Route>
          <Route path='/profile'>
            <ProfilePage/>
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

export default () => <App loginState={globalLoginState}/>; 