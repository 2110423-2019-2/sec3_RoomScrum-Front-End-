import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NotFoundPage from './not-found';
import Home from './home';
import Register from './register';
import Dashboard from './RawDashboard/dashboard';
import Eventinfo from './RawDashboard/Event Info';
import Appliedmusician from './RawDashboard/AppliedMusician';
import Currentcontract from './RawDashboard/CurrentContract';
import request from 'superagent';

import config from 'src/config';
import { globalLoginState } from 'src/store';
import EventPages from './event';

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
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/dashboard">
          <Dashboard/>
        </Route>
        <Route path="/eventinfo">
          <Eventinfo/>
        </Route>
        <Route path="/appliedmusician">
          <Appliedmusician/>
        </Route>
        <Route path="/currentcontract">
          <Currentcontract/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/">
          <NotFoundPage/>
        </Route>
        <Route path='/event'>
          <EventPages/>
        </Route>
      </Switch>
    </Router>
          
  );
};

export default () => <App loginState={globalLoginState}/>; 