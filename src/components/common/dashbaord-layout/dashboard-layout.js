import React from 'react';
import './dashboard-layout.scss';


// use with dashboard side nav, dashboard content
export const DashboardLayout = ({children}) => {
    return (
        <div className="row dashboard-layout m-0">
            { children }
        </div>
    );
}

export const DashboardNavigation = ({children}) => {
    return (
        <div className="left-nav col-auto">
            { children }
        </div>
    );
}

export const DashboardContent = ({children}) => {
    return (
        <div className="col stretch p-0">
            { children }
        </div>
    );
}