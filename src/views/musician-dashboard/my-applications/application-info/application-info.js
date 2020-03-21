import React, { useState, useRef } from 'react';
import request from 'superagent';
import config from 'src/config';
import './application-info.scss';
import { Indicator } from '../my-applications';
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

const ApplicationInfoDialog = ({application, onClose, onCancel}) => {
    
    const {
        status: applicationStatus,
        event
    } = application;
    const {
        eventId,
        eventName,
        status: eventStatus,
        startdatetime,
        enddatetime,
        address, subdistrict, district, province, zipcode,
        budget,
        description,
        userId: hirerId,
    } = event;

    const [hirerData, setHirerData] = useState(null);
    const isFetch = useRef(false);
    if (!isFetch.current) {
        isFetch.current = true;
        request.get(config.API_URL + '/user/' + hirerId)
        .withCredentials()
        .then(res => {
            setHirerData(res.body);
        })
        .catch(err => {
            alert("error getting hirer's data");
            console.error("error getting hirer's data", err);
        })
    }

    const showHirerName = (hirer) => {
        if (!hirer) return null;
        const {
            firstName, lastName
        } = hirer;
        return `${firstName} ${lastName}`;
    }


    return (
        <div className="event-info-dialog">
            {
                (() => {            
                    return (
                        <div className="event-info">
                            <button className="top-right btn" onClick={onClose}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <div className="title"> {eventName}</div>
                            <div className="image">
                                <Image
                                    src={[
                                        config.API_URL + '/events/' + eventId + '/pic',
                                        'https://i.pravatar.cc/128'
                                    ]}
                                />
                            </div>
                            <div className="desc">
                                <div className="label"> Your status </div>
                                <div className="value">
                                    <Indicator color="green"/>
                                    {eventStatus}, {applicationStatus}
                                    <span className="text-btn text-danger">cancel</span>
                                </div>
                            </div>
                            <div className="desc">
                                <div className="label"> Contract status </div>
                                <div className="value">
                                    <Indicator color="yellow"/>
                                    {"TODO"}
                                    <span className="text-btn text-muted">view</span>
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
                                <div className="value"> {budget || '<<budget>>'} baht </div>
                            </div>
                            <div className="desc">
                                <div className="label"> Hirer </div>
                            <div className="value"> 
                                { showHirerName(hirerData) }
                            </div>
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

export default ApplicationInfoDialog;