import React from "react";
import {
  useRouteMatch,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ApproveUserPage from "./approve-user";
import {
  Navbar,
  DashboardLayout,
  DashboardNavigation,
  DashboardContent
} from "./node_modules/src/components/common";
import "./admin.scss";
import { SideNavigation } from "./node_modules/src/components/common/sidebar/sidebar";
import BannedUsersPage from './node_modules/src/views/admin/banned-user'
import UserReportPage from "./user-report";

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
  console.log("admin =", url);
  
  return (
    <div className="full-height">
      <Navbar />
      <DashboardLayout>
        <DashboardNavigation>
          <SideNavigation
          />
        </DashboardNavigation>
        <DashboardContent>
          <Switch>
            <Route path={url + "/approve-user"}>
              <ApproveUserPage />
            </Route>
            <Route path={url + "/banned-users"}>
              <BannedUsersPage />
            </Route>
            <Route path={url + "/user-report"}>
              <UserReportPage />
            </Route>
            <Route path={url + "/"}>404 Admin</Route>
          </Switch>
        </DashboardContent>
      </DashboardLayout>
    </div>
  );
};
