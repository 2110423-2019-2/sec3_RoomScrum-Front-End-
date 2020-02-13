import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './login';
import NotFoundPage from './not-found';
import Home from './home';
import Register from './register';
import Dashboard from './dashboard';
import Eventinfo from './Event Info';
import Appliedmusician from './AppliedMusician';
import Currentcontract from './CurrentContract';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login/>
        </Route>
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
        <Route path="/">
          <NotFoundPage/>
        </Route>
       

      </Switch>
    </Router>
  );
}