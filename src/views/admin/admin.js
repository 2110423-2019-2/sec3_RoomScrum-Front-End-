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
} from "src/components/common";
import "./admin.scss";
import Sidebar, { SideNavItemDetail } from "src/components/common/sidebar";
import BannedUsersPage from 'src/views/admin/banned-user'
import UserReportPage from "./user-report";

const sidebarItems = [
  SideNavItemDetail("Approve musicians", "/admin/approve-user"),
  SideNavItemDetail("User report", "/admin/user-report"),
  SideNavItemDetail("Banned users", "/admin/banned-users"),
];

export default () => {
  const { url } = useRouteMatch();
  console.log("admin =", url);
  
  return (
    <div className="full-height">
      <Navbar />
      <DashboardLayout>
        <DashboardNavigation>
          <Sidebar items={sidebarItems}/>
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
