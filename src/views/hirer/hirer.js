import React from "react";
import {
  useRouteMatch,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Profile from "./profile";
import {
  Navbar,
  DashboardLayout,
  DashboardNavigation,
  DashboardContent
} from "src/components/common";
import "./hirer.scss";
import { SideNavigation } from "src/components/common/sidebar-hirer/sidebar-hirer";
import Event from 'src/views/hirer/event'
import Contract from "./contract";
import EditProfile from "./profile/edit-profile"
import MyEventInfo from "src/components/my-events-item/my-event-info"

const ListItem = ({ url, text }) => {
  return (
    <Link
      to={url}
      className="list-group-item list-group-item-action text-muted p-2"
    >
      {" "}
      {text}{" "}
    </Link>
  );
};

export default () => {
  const { url } = useRouteMatch();
  console.log("hirer = ", url);
  
  return (
    <div className="full-height">
      <Navbar />
      <DashboardLayout>
        <DashboardNavigation>
          <SideNavigation />
        </DashboardNavigation>
        <DashboardContent>
          <Switch>
            <Route path={url + "/profile/me"}>
              <Profile />
            </Route>
            <Route path={url + "/profile/edit"}>
              <EditProfile />
            </Route>
            <Route path={url + "/event"}>
              <Event />
            </Route>
            <Route path={url + "/contract"}>
              <Contract />
            </Route>
            <Route path={url + "/"}>404 Admin</Route>
          </Switch>
        </DashboardContent>
      </DashboardLayout>
    </div>
  );
};
