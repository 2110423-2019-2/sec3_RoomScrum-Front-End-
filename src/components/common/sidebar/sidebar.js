import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './sidebar.scss';
import classname from 'classnames';


export const SideNavItemDetail = (text, href) => {
    return {text, href};
}

const SideNavItem = ({item}) => {
    const {text, href} = item;
    const match = useRouteMatch(href);
    
    return (
        <Link to={item.href} className={
            classname({
                "sidebar-item": true,
                "active": !!match,
            })
        }> 
            { item.text }
        </Link>
    );
}

const SideNavigation = ({items = []}) => {

    const match = useRouteMatch();
    console.group("sidenav debug")
    console.log(match)
    console.groupEnd()

    if (items.length == 0) console.warn("WARNING: items must not be empty");

    return (
        <div className="sidebar">
            {
                items.map(item => (
                    <SideNavItem item={item}/> 
                ))
            }
        </div>
    )
}

export default SideNavigation;