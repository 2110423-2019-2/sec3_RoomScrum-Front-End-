import React from 'react';
import { DashboardContent, DashboardNavigation, DashboardLayout } from 'src/components/common/dashbaord-layout'
import Sidebar, {SideNavItemDetail} from 'src/components/common/sidebar';
import { Navbar } from 'src/components/common';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import BandInvitations from './band-invitations';
import MyEventsPage from './my-events';

const sidebarItems = [
    SideNavItemDetail("My Profile", "/musician/my-profile"),
    SideNavItemDetail("My Band", "/musician/my-band"),
    SideNavItemDetail("Band Invitation", "/musician/band-invitations"),
    SideNavItemDetail("Event Invitations", "/musician/event-invitations"),
    SideNavItemDetail("Applied Events", "/musician/my-events"),
    
  ];

const MusicianDashboard = () => {
    // prefix path for dashboard
    const { url } = useRouteMatch();

    return (
        <div className="full-height">
            <Navbar/>
            <DashboardLayout>
                <DashboardNavigation>
                    <Sidebar items={sidebarItems}/>
                </DashboardNavigation>
                <DashboardContent>
                    <Switch>
                        <Route path={url + "/band-invitations"}>
                            <BandInvitations/>
                        </Route>
                        <Route path={url + "/my-events"}>
                            <MyEventsPage/>
                        </Route>
                        <Route path="/">
                            404 musician dashbaord
                        </Route>
                    </Switch>
                </DashboardContent>
            </DashboardLayout>
        </div>
    )
}

export default MusicianDashboard;