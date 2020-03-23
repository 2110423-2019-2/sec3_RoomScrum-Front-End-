import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Dialog from 'src/components/common/dialog';
import ConfirmDialog from 'src/components/common/confirm-dialog-v2';
import Image from 'react-image';

import './my-applications.scss';
import ApplicationInfo from './application-info';
import request from 'superagent';
import config from 'src/config';
import { EventStatusIndicator, ContractStatusIndicator } from 'src/components/event-item/status-indicator/status-indicator';
import { sortByTimestampDesc } from '../util';
import { ApplicationStatus } from 'src/enums';



const AppliedEventItem = ({
    application, onCancel, // when click cancel
    onSelectEvent,
}) => {
    const {
        status: applicationStatus,
        event: {
            eventName,
            eventId,
            status: eventStatus,
            district, province,
            userId: hirerId,
            price,
            contractStatus,
            user: { // hirer
                firstName, lastName
            }
        }
    } = application;
    console.log(application);
    return (
        <div className="applied-event-item clearfix">
            <Image className="event-image" src={[
                config.API_URL + `/events/${eventId}/pic`,
                'https://i.pravatar.cc/180',
            ]} loader={<div className="event-image placeholder"></div>}
            />
            <div className="event-info">
                <div className="event-name" onClick={onSelectEvent}> {eventName} </div>
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
                    </div>
                </div>
                <div className="desc">
                    <div className="label"> District </div>
                    <div className="value"> {district}</div>
                </div>
                <div className="desc">
                    <div className="label"> Province </div>
                    <div className="value"> {province}</div>
                </div>
                <div className="desc">
                    <div className="label"> Hirer </div>
                    <div className="value"> {firstName + ' ' + lastName} </div>
                </div>
            </div>
            <div className="price-tag">
                <div className="price"> {price || 'price ????'}</div>
                <div className="currency"> baht </div>
            </div>
            <div className="cancel-wrapper">
                <button onClick={onCancel}>
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    cancel
                </button>
            </div>
        </div>
    )
}

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const isFetch = useRef(false);
    const targetEvent = useRef(null); // use Ref to prevent to many state
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showInfoDialog, setShowInfoDialog] = useState(false);
    const [applicationToShow, setApplicationToShow] = useState(null);


    const fetchApplications = () => {
        request.post(config.API_URL + '/application/my-application') // get my applications, with event detail
            .send({status: [ApplicationStatus.APPLICATION_REJECTED, ApplicationStatus.IS_ACCEPTED, ApplicationStatus.IS_APPLIED]})
            .withCredentials()
            .then(res => {
                const applications = res.body;
                applications.sort(sortByTimestampDesc)
                setApplications(applications);
            })
            .catch(err => {
                alert("Error getting applied events ");
                console.error("Error: Fetch applied events");
            })
    };

    if (!isFetch.current) {
        isFetch.current = true;
        fetchApplications();
    }

    // TODO: wait for API
    // set target event id then show dialog
    const confirmCancelApplicationOf = (eventId) => {
        targetEvent.current = eventId;
        setShowCancelDialog(true);
    }

    // cancel application of specified event
    const cancelEvent = (confirmed) => {
        // always hide dialog
        setShowCancelDialog(false);
        if (!confirmed) return;
        request.delete(config.API_URL + `/application/${targetEvent.current}/cancel-my-application`)
        .withCredentials()
        .then(res => {
            // too lazy to optimize API request
            fetchApplications();
        })
        .catch(err => {
            alert("error canceling application" + err.response.text);
            console.error("error canceling application" + err.response.body)
        })
    }

    const showApplicationPopup = (application) => {
        console.log("show application", application);
        setApplicationToShow(application);
        setShowInfoDialog(true);
    };



    return (
        <div className="band-invitations">
            {
                applications.map(application => (
                    <AppliedEventItem application={application} onCancel={() => confirmCancelApplicationOf(application.eventId)} onSelectEvent={() => showApplicationPopup(application)} />
                ))
            }
            <Dialog isOpen={showCancelDialog} onClose={() => setShowCancelDialog(false)}>
                <ConfirmDialog title="Cancel Event" question="This will withdraw you from event! this action can't be undone" callback={cancelEvent} />
            </Dialog>
            <Dialog isOpen={showInfoDialog} onClose={() => setShowInfoDialog(false)}>
                {applicationToShow && <ApplicationInfo application={applicationToShow} onClose={() => setShowInfoDialog(false)} onCancel={() => confirmCancelApplicationOf(applicationToShow.eventId)} />}
            </Dialog>
        </div>
    )
}

export default MyApplications;
