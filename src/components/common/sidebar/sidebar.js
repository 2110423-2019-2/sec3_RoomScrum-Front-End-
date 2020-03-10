import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './sidebar.scss';


const fakeItems = [
    {text: "Approve musicians", href: "/admin/approve-user"},
    {text: "User report", href: "/admin/user-report"},
    {text: "Banned users", href: "/admin/banned-users"},
] 

export const SideNavigation = () => {

    const {url} = useRouteMatch();

    return (
        <div className="sidebar">
            {
                fakeItems.map(item => (
                    <Link to={item.href} className="sidebar-item"> 
                        { item.text }
                    </Link>
                ))
            }
        </div>
    )
}