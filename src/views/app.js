import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './login';
import NotFoundPage from './not-found';
import Home from './home';
import FindEvents from './find-events';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/find/events'>
          <FindEvents />
        </Route>
        <Route path='/'>
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};
