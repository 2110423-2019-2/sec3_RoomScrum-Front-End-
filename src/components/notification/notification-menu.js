import React, { useState, useRef } from 'react'
import './notification.scss';
import * as moment from 'moment';
import request from 'superagent';
import config from 'src/config';
import { getImageURLFromNotif, getTextFormat } from './util';
import { TextFormatter } from './text-formatter';
import Modal from 'react-modal';

moment.locale('en', {
    relativeTime: {
        future: "in %s",
        past: "%s",
        s: "now",
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        M: "1m",
        MM: "%dm",
        y: "1y",
        yy: "%dy"
    }
});

const NotificationItem = ({notif}) => {
    return (
        <div className="notif-item">
            <div className="image">
                <img src={getImageURLFromNotif(notif)} />
            </div>
            <div className="notif-text">
                <div> { /* desc container */}
                    <TextFormatter notif={notif}/>
                </div>
                <div className="timestamp"> {moment(notif.timestamp).fromNow()}</div>
            </div>
        </div>
    );
}


const NotificationMenu = () => {

    const hasInit = useRef(false);
    const [notifications, setNotifications] = useState(null);
    
    if (!hasInit.current) {
        hasInit.current = true;
        request.get(config.API_URL + "/notification")
        .withCredentials()
        .send()
        .then(res => {
            const result = JSON.parse(res.text);
            setNotifications(result);
            console.log('fetch notif', result)    
        })
        .catch(err => {
            console.error("error fetching notifications", err);
        })
    }

    return (
        // <Modal isOpen={show} onRequestClose={onClose}
        //     parentSelector={parentSelectorFunc}
        //     className="just-an-invalid-class"
        //     overlayClassName="notif-modal-overlay"
        // >
            <div className="notif-menu-container">
                <div className="notif-triangle"></div>
                <div className="notif-menu">
                    <div className="header"> Notification </div>
                    <div className="notif-list">
                        {
                            notifications && notifications.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map(notif => (
                                <NotificationItem notif={notif}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        // </Modal>
    )
}


export default NotificationMenu;