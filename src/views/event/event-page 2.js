import React from "react";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import CreateEventPage from "./create-event";
import Dashboard from "./dashboard";
import EventInfo from "./event-info";
import Appliedmusician from "./applied-musician";
import Currentcontract from "./current-contract";
import HirerDashboard from "../hirer-dashboard"

const EventPages = () => {
  const { url } = useRouteMatch();

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path={url + "/create"}>
            <CreateEventPage path={url} />
          </Route>
          <Route path={url + "/create"}>
            <CreateEventPage path={url} />
          </Route>
          <Route path={url + "/dashboard"}>
            <Dashboard />
          </Route>
          {/* <Route path={url + "/info/:id"}>
            <EventInfo />
          </Route> */}
          <Route path={url + "/info/:id"}>
            <HirerDashboard />
          </Route>
          <Route path={url + "/applied-musicians"}>
            <Appliedmusician />
          </Route>
          <Route path={url + "/contract"}>
            <Currentcontract />
          </Route>
          <Route path={`${url}/`}>404: event</Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default EventPages;
