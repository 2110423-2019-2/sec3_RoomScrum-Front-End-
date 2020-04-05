import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const DropdownMenu = ({ show, onClose, onLogout }) => {
    return (
        <Modal isOpen={show} 
            onRequestClose={onClose}
            className="some-class"
            overlayClassName="dropdown-overlay"
        >
            <div className="dropdown-container">
                <div className="dropdown-triangle"></div>
                <div
                    className={'dropdown-menu dropdown list-group'}>
                    {/* FIX PATH LATER */}
                    <Link className='dropdown-item' to='/profile/me/application'>
                        {' '}
            Applications{' '}
                    </Link>
                    <Link className='dropdown-item' to='/profile/me/calendar'>
                        {' '}
            Calendar{' '}
                    </Link>
                    <div className='dropdown-divider'></div>
                    <Link className='dropdown-item' to='/hirer/event'>
                        {' '}
            My Events{' '}
                    </Link>
                    <Link className='dropdown-item' to='/event/search'>
                        {' '}
            Find Events{' '}
                    </Link>
                    <Link className='dropdown-item' to='/event/create'>
                        {' '}
            Create Event{' '}
                    </Link>
                    <div className='dropdown-divider'></div>
                    <Link className='dropdown-item' to='/band/list'>
                        {' '}
            My Bands{' '}
                    </Link>
                    <Link className='dropdown-item' to='/band/search'>
                        {' '}
            Find Bands{' '}
                    </Link>
                    <Link className='dropdown-item' to='/band/create'>
                        {' '}
            Create Band{' '}
                    </Link>
                    <div className='dropdown-divider'></div>
                    <Link className='dropdown-item' to='/profile/me'>
                        {' '}
            My Profile{' '}
                    </Link>
                    <div className='text-danger dropdown-item' onClick={onLogout}>
                        {' '}
                Logout{' '}
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default DropdownMenu;