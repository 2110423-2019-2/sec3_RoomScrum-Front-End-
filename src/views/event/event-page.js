import React from 'react';
import { BrowserRouter, Route, Switch, useRouteMatch } from 'react-router-dom';
import CreateEventPage from './create-event';
import EventInfo from './event-info';

const EventPages = () => {
    const {url} = useRouteMatch();

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path={`${url}/create`}>
                        <CreateEventPage/>
                    </Route>
                    <Route path={`${url}/info`}>
                        <EventInfo/>
                    </Route>
                    <Route exact path={`${url}/`}>
                        event info
                    </Route>
                    <Route path={`${url}/`}>
                        404: event
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default EventPages;