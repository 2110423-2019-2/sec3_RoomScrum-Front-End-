import React from 'react'
import './notification.scss';
import * as moment from 'moment';

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

const NotificationItem = ({ image, text, timestamp, actor }) => {
    return (
        <div className="notif-item">
            <div className="image">
                <img src={image} />
            </div>
            <div className="text">
                <div> { /* desc container */}
                    <span className="actor"> {actor}</span>
                    <span className="desc"> {text} </span>
                </div>
                <div className="timestamp"> {moment(timestamp).fromNow()}</div>
            </div>
        </div>
    );
}


const NotificationMenu = ({show}) => {
    return (
        show &&
        <div className="notif-menu-container">
            <div className="notif-triangle"></div>
            <div className="notif-menu">
                <div className="header"> Notification </div>
                <div className="notif-list">
                    <NotificationItem
                        actor="Road"
                        image="/logo192.png"
                        text="invite you to his band"
                        timestamp={new Date("2020-03-08 17:05:40")}
                    />
                    <NotificationItem
                        actor="Road"
                        image="/logo192.png"
                        text="invite you to his band"
                        timestamp={new Date("2020-03-08 17:05:40")}
                    />
                    <NotificationItem
                        actor="Road"
                        image="/logo192.png"
                        text="invite you to his band"
                        timestamp={new Date("2020-03-08 17:05:40")}
                    />
                    <NotificationItem
                        actor="Road"
                        image="/logo192.png"
                        text="invite you to his band"
                        timestamp={new Date("2020-03-08 17:05:40")}
                    />
                    <NotificationItem
                        actor="Road"
                        image="/logo192.png"
                        text="invite you to his band"
                        timestamp={new Date("2020-03-08 17:05:40")}
                    />
                    <NotificationItem
                        actor="Road"
                        image="/logo192.png"
                        text="invite you to his band"
                        timestamp={new Date("2020-03-08 17:05:40")}
                    />
                    <NotificationItem
                        actor="Road"
                        image="/logo192.png"
                        text="invite you to his band"
                        timestamp={new Date("2020-03-08 17:05:40")}
                    />
                    <NotificationItem
                        actor="Road"
                        image="/logo192.png"
                        text="invite you to his band"
                        timestamp={new Date("2020-03-08 17:05:40")}
                    />

                </div>
            </div>
        </div>
    )
}


export default NotificationMenu;