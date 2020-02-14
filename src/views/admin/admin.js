import React from 'react';
import { useRouteMatch, BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import ApproveUserPage from './approve-user';
import { Navbar, DashboardLayout, DashboardNavigation, DashboardContent } from 'src/components/common';
import './admin.scss';

const ListItem = ({url, text}) => {
    return (
        <Link to={url} className="list-group-item list-group-item-action text-muted p-2"> {text} </Link>
    );
}


export default () => {
    const {url} = useRouteMatch();
    console.log("admin =", url);
    return (
        <div className="full-height">
            <Navbar/>
            <DashboardLayout>
                <DashboardNavigation>
                    <div className="list-group pt-4">
                        <ListItem url={url + "/approve-user"} text="Approve Musicians"/>
                        <ListItem url={url + "/reports"} text="User Reports"/>
                    </div>    
                </DashboardNavigation>
                <DashboardContent>
                    <Switch>
                        <Route path={url + "/approve-user"}>
                            <ApproveUserPage/>
                        </Route>
                        <Route exact path={url + "/"}>

                        </Route>
                        <Route path={url + "/"}>
                            404 Admin
                        </Route>
                    </Switch>
            </DashboardContent>
            </DashboardLayout>
        </div>
    );
}