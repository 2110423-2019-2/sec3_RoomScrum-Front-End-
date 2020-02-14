import React from 'react';
import { useRouteMatch, BrowserRouter, Switch, Route } from 'react-router-dom';
import ApproveUserPage from './approve-user';

export default () => {
    const {url} = useRouteMatch();
    console.log("admin =", url);
    return (
        <BrowserRouter>
            <Switch>
                <Route path={url + "/approve-user"}>
                    <ApproveUserPage/>
                </Route>
                <Route exact path="/">

                </Route>
                <Route path="/">
                    404 Admin
                </Route>
            </Switch>
        </BrowserRouter>
    )
}