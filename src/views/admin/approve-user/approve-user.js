import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import './approve-user.scss';

import MusicianInfoDialog from './components/musician-info-dialog';
import UserItem from './components/user-item';
import request from 'superagent';
import config from 'src/config';


export default () => {
    const match = useRouteMatch();
    const {url} = match;
    console.log(match);

    const [open, setOpen] = useState(false);
    
    const [musicians, setMusician] = useState(null);
    const [shownMusician, setShownMusician] = useState(null);
    if (musicians === null) {
        // request.get(`${config.API_URL}/admin/user/unapproved`)
        request.get('http://localhost:3003/users')
            .then((res) => {
                setMusician(JSON.parse(res.text));
            })
            .catch((err) => {
                alert("Error fetching musicians");
            })
    }

    const removeShownMusician = () => {
        setMusician(musicians.filter(m => m.userId !== shownMusician.id));
    }
    return (
        <div className="approve-musician bg-light pt-2">
            { 
                shownMusician && <MusicianInfoDialog 
                    onAcceptSuccess={removeShownMusician}
                    onRejectSuccess={removeShownMusician}
                    userInfo={shownMusician}
                    isOpen={open} onRequestClose={() => setOpen(false)}
                />
            }
            <h1 className="pl-4"> Approve Musicians </h1>
            <div className="row justify-content-around">
                {
                    musicians && musicians.map(m => (
                        <UserItem userInfo={m} onViewMusician={() => {
                            setShownMusician(m);
                            setOpen(true);
                        }}/>
                    ))
                }
            </div>
        </div>
    )
}