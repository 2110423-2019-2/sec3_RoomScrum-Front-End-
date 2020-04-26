import React from 'react';
import { Link } from 'react-router-dom';
import {RoleGuard, Roles, LoginGuard} from 'src/components/common/guard';

const DropdownMenu = ({ show, onClose, onLogout }) => {
    return (
        <div className="dropdown-container">
            <div className="dropdown-triangle"></div>
            <div
                className={'dropdown-menu dropdown list-group'}>
                {/* <RoleGuard role={Roles.Musician}> */}
                    <Link className='dropdown-item' to='/musician/my-profile'>
                        My profile
                    </Link>
                    <Link className='dropdown-item' to='/musician/calendar'>
                        Calendar
                    </Link>
                    <Link className='dropdown-item' to='/musician/event-invitations'>
                        My Applications
                    </Link>
                    <Link className='dropdown-item' to='/musician/my-events'>
                        Invitations
                    </Link>
                {/* </RoleGuard> */}
                {/* <RoleGuard role={Roles.Hirer}> */}
                    <Link className='dropdown-item' to='/hirer/profile/me'>
                        My profile
                    </Link>
                    {/* <Link className='dropdown-item' to='/event/create'>
                        Create Event
                    </Link> */}
                    <Link className='dropdown-item' to='/hirer/event'>
                        My Events
                    </Link>
                    <Link className='dropdown-item' to='/hirer/profile/edit'>
                        Edit My Profile
                    </Link>
                {/* </RoleGuard> */}
                {/* <RoleGuard role={Roles.Hirer}> */}
                    <div className='dropdown-divider'></div>
                    <Link className='dropdown-item' to='/event/create'>
                        Create Event
                    </Link>
                {/* </RoleGuard> */}
                <div className='dropdown-divider'></div>
                <div className='text-danger dropdown-item' onClick={onLogout}>
                    Logout
                </div>
            </div>
        </div>
    );
}

export default DropdownMenu;