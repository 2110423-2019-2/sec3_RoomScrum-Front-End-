import React, {useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Dialog from 'src/components/common/dialog';
import ConfirmDialog from 'src/components/common/confirm-dialog-v2';
import Image from 'react-image';

import './my-applications.scss';
import ApplicationInfo from './application-info';
import request from 'superagent';
import config from 'src/config';
import { ApplicationStatus } from 'src/enums';

const toColor = (colorName) => {
    // return "red";
    switch (colorName) {
        case "green":
            return "#569D66";
        case "yellow":
            return "#ECBF4D";
        default:
            return colorName;
    }
}

const _Indicator = styled.div`
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 8px;
    background-color: ${props => toColor(props.color)};
`

// TODO: refactor
export const Indicator = ({color}) => {
    return <_Indicator color={color}/>
}


// const StatusConverter = (eventStatus, applicationStatus) => {
//     switch (applicationStatus) {
//         // 3 status พวกนี้รู้แน่ชัดว่าควรแสดงว่าไร
//         case ApplicationStatus.IS_INVITED:
//             return "Invited";
//         case ApplicationStatus.IS_APPLIED:
//             return "Applied";
//         case ApplicationStatus.APPLICATION_REJECTED:
//             return "Rejected";
//         case ApplicationStatus.IS_ACCEPTED: // now check depend on event status
//             switch (eventStatus) {
//                 case EventStatus.
//             }
//     }
// }

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
            // missing fields
            price,
            contractStatus,
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
                        <Indicator color="green"/>
                        {eventStatus}, {applicationStatus}
                    </div>
                </div>
                <div className="desc">
                    <div className="label"> Contract Status </div>
                    <div className="value"> 
                        <Indicator color="yellow"/>
                        {contractStatus}
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
                    <div className="value"> # {hirerId || 'hirerName???'}</div>
                </div>
            </div>
            <div className="price-tag">
                <div className="price"> {price || 'price ????'}</div>
                <div className="currency"> baht </div>
            </div>
            <div className="cancel-wrapper">
                <button onClick={onCancel}>
                    <FontAwesomeIcon icon={faExclamationTriangle}/>
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
        request.get(config.API_URL + '/application/my-application') // get my applications, with event detail
        .withCredentials()
        .then(res => {
            setApplications(res.body);
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
        alert("cancel " + targetEvent.current + " success!")
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
                    <AppliedEventItem application={application} onCancel={() => confirmCancelApplicationOf(application.eventId)} onSelectEvent={() => showApplicationPopup(application)}/>
                ))
            }
            <Dialog isOpen={showCancelDialog} onClose={() => setShowCancelDialog(false)}>
                <ConfirmDialog title="Cancel Event" question="This will withdraw you from event! this action can't be undone" callback={cancelEvent}/>
            </Dialog>
            <Dialog isOpen={showInfoDialog} onClose={() => setShowInfoDialog(false)}>
                { applicationToShow && <ApplicationInfo application={applicationToShow} onClose={() => setShowInfoDialog(false)} onCancel={() => confirmCancelApplicationOf(applicationToShow.eventId)}/> }
            </Dialog>
        </div>
    )
}

export default MyApplications;
