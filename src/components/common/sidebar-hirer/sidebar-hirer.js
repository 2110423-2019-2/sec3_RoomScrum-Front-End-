import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './sidebar-hirer.scss';
import classname from 'classnames';


const fakeItems = [
    {text: "My profile", href: "/hirer/profile/me"},
    {text: "My event", href: "/hirer/event"},
    {text: "Current contract", href: "/hirer/contract"},
] 

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

export const SideNavigation = () => {

    const match = useRouteMatch();
    console.group("sidenav debug")
    console.log(match)
    console.groupEnd()

    return (
        <div className="sidebar">
            {
                fakeItems.map(item => (
                    <SideNavItem item={item}/> 
                ))
            }
        </div>
    )
}