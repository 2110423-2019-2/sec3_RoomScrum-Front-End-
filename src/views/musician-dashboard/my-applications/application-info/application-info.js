import React, { useState, useRef } from 'react';
import request from 'superagent';
import config from 'src/config';
import './application-info.scss';
import { Indicator } from '../my-applications';
import moment from 'moment';
import Image from 'react-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { EventStatusIndicator, ContractStatusIndicator } from 'src/components/event-item/status-indicator/status-indicator';

const TimeDisplay = ({ start, end }) => {
    return (
        <div className="value">
            {moment(start).format("h:mm DD/MM/YYYY")} - {moment(end).format("h:mm DD/MM/YYYY")}
        </div>
    )
}

const ApplicationInfoDialog = ({ application, onClose, onCancel }) => {

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
        user: {
            firstName, lastName,
        }
    } = event;

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
                                    <EventStatusIndicator
                                        eventStatus={eventStatus}
                                        applicationStatus={applicationStatus}
                                    />
                                </div>
                            </div>
                            <div className="desc">
                                <div className="label"> Contract Status </div>
                                <div className="value">
                                    {/** TODO */}
                                    <ContractStatusIndicator contractStatus={"TODO"} />
                                    <div>TODO view contract</div>
                                </div>
                            </div>
                            <div className="desc">
                                <div className="label"> Address </div>
                                <div className="value"> {address + ", " + subdistrict + ", " + district + ", " + province + ", " + zipcode}</div>
                            </div>
                            <div className="desc">
                                <div className="label"> Time </div>
                                <TimeDisplay start={startdatetime} end={enddatetime} />
                            </div>
                            <div className="desc">
                                <div className="label"> Budget </div>
                                <div className="value"> {budget || '<<budget>>'} baht </div>
                            </div>
                            <div className="desc">
                                <div className="label"> Hirer </div>
                                <div className="value">
                                    {firstName + ' ' + lastName}
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