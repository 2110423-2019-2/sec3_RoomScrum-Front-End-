import React, { useState } from 'react';
import request from 'superagent';
import config from 'src/config';
import './event-info.scss';
import { Indicator } from '../my-events';
import moment from 'moment';
import Image from 'react-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const TimeDisplay = ({start, end}) => {
    return (
        <div className="value">
            {moment(start).format("h:mm DD/MM/YYYY")} - {moment(end).format("h:mm DD/MM/YYYY")}
        </div>
    )
} 

const EventInfoDialog = ({eventId, onClose}) => {
    const [isFetch, setFetch] = useState(null);
    const [eventInfo, setEventInfo] = useState(null);
    const [hirerInfo, setHirerInfo] = useState(null);

    if (isFetch != eventId) {
        setFetch(eventId)
        request.get(config.API_URL + '/events/' + eventId)
        .withCredentials()
        .then(res => {
            setEventInfo(res.body);
            const hirerId = res.body.userId;
            request.get(config.API_URL + '/user/' + hirerId) 
            .withCredentials()
            .then(res2 => {
                setHirerInfo(res2.body);
                console.log(res2.body);
            })
        })
        .catch(err => {
            alert("error fetching eventInfo for " + eventId);
            console.error("error fetching" + eventId, err);
        })
    }

    

    return (
        <div className="event-info-dialog">
            {
                (() => {
                    if (!eventInfo) return null;
                    const {
                        eventName,
                        status,
                        startdatetime,
                        enddatetime,
                        address, subdistrict, district, province, zipcode,
                        budget = 9999999,
                        description,
                        userId
                    } = eventInfo;                 
                    return (
                        <div className="event-info">
                            <button className="top-right btn" onClick={onClose}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <div className="title"> {eventName}</div>
                            <div className="image">
                                <Image
                                    src={[
                                        config.API_URL + '/events/pic/' + eventId,
                                        'https://i.pravatar.cc/128'
                                    ]}
                                />
                            </div>
                            <div className="desc">
                                <div className="label"> Your status </div>
                                <div className="value">
                                    <Indicator color="green"/>
                                    {status}
                                </div>
                            </div>
                            <div className="desc">
                                <div className="label"> Contract status </div>
                                <div className="value">
                                    <Indicator color="yellow"/>
                                    {"TODO"}
                                </div>
                            </div>
                            <div className="desc">
                                <div className="label"> Address </div>
                                <div className="value"> { address + ", " + subdistrict + ", " + district + ", " + province + ", " + zipcode}</div>
                            </div>
                            <div className="desc">
                                <div className="label"> Time </div>
                                <TimeDisplay start={startdatetime} end={enddatetime}/>
                            </div>
                            <div className="desc">
                                <div className="label"> Budget </div>
                                <div className="value"> {budget} baht </div>
                            </div>
                            <div className="desc">
                                <div className="label"> Hirer </div>
                            <div className="value"> {
                                (() => {
                                    if (!hirerInfo) return "Loading ... ";
                                    const {firstName, lastName} = hirerInfo;
                                    return firstName + " " + lastName;
                                })()
                            }</div>
                            </div>
                            <div className="desc">
                                <div className="label"> About </div>
                                <div className="value"> {description}</div>
                            </div>
                        </div>
                    );
                })()
            }
        </div>    
    )
}

export default EventInfoDialog;