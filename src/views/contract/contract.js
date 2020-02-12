import React from 'react'
import {Navbar, Form } from "src/components/common";
import { BrowserRouter, useRouteMatch, Switch, Route } from 'react-router-dom';

import ManageContract from './manage-contract';

export default () => {
    const {url} = useRouteMatch();

    // const {a: {name} , b, c} = {a:{name: 'road'}, b:2, c:3};
    // const [x, y] = [1, 2];

    
    return (
        <BrowserRouter>
            <Switch>
                <Route path={`${url}/manage`}>
                    <ManageContract/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
};