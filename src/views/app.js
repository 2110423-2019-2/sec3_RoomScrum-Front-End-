import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import request from "superagent";

import NotFoundPage from "./not-found";
import Home from "./home";
import Register from "./register";
import EventPages from "./event";
import Hirerpages from "./hirer";
import AdminPages from "./admin";
import config from "src/config";
import { globalLoginState } from "src/store";
import FindEvents from "./event/find-events";

const App = ({ loginState }) => {
  const attempt = useRef(false);

  if (!attempt.current) {
    attempt.current = true;
    request
      .get(`${config.API_URL}/auth/status`)
      .withCredentials()
      .then(res => {
        const { username } = JSON.parse(res.text);
        if (username) {
          loginState.username = username;
          console.log("logged in as", username);
        }
      })
      .catch(err => {});
  }

  return (
    <Router>
      <Switch>
        <Route path="/find/events">
          <FindEvents />
        </Route>
        <Route path="/event">
          <EventPages />
        </Route>
        <Route path="/admin">
          <AdminPages />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/hirer">
          <Hirerpages />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default () => <App loginState={globalLoginState} />;
