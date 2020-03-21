import React, {useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Dialog from 'src/components/common/dialog';
import ConfirmDialog from 'src/components/common/confirm-dialog-v2';

import './my-events.scss';
import EventInfoDialog from './event-info';

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


const AppliedEventItem = ({
    event: {
        name,
        eventId,
        status,
        district, province,
        hirerName, // computed ?
        contractStatus, // computed ?
        price, // computed ?
    }, onCancel, // when click cancel
    onSelectEvent,
}) => {
    return (
        
        <div className="applied-event-item clearfix">
            <img className="event-image" src="https://i.pravatar.cc/160"/>
            <div className="event-info">
                <div className="event-name" onClick={onSelectEvent}> {name} </div>
                <div className="desc">
                    <div className="label"> Your status </div>
                    <div className="value"> 
                        <Indicator color="green"/>
                        {status}
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
                    <div className="value"> {hirerName}</div>
                </div>
            </div>
            <div className="price-tag">
                <div className="price"> {price}</div>
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

const fakeEvent = {
    name: "SE Miniconert 2020",
    status: "Approved",
    contractStatus: "In contract",
    district: "Muang",
    province: "Chon Buri",
    eventId: 1,
    hirerName: "John Doge",
    price: 999999,
};

const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const isFetch = useRef(false);
    const targetEvent = useRef(null); // use Ref to prevent to many state
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showInfoDialog, setShowInfoDialog] = useState(false);
    const [eventId, setEventId] = useState(null);


    const fetchEvents = () => {
        setEvents(Array(11).fill(0).map((_, idx) => {
            return {...fakeEvent, eventId: 1 + idx};
        }))
    }

    if (!isFetch.current) {
        isFetch.current = true;
        fetchEvents();
    }

    const confirmCancelEvent = (eventId) => {
        targetEvent.current = eventId;
        setShowCancelDialog(true);
    }

    const cancelEvent = (confirmed) => {
        // always hide dialog
        setShowCancelDialog(false);
        if (!confirmed) return;
        alert("cancel " + targetEvent.current + " success!")
    }

    const showEventPopup = (eventId) => {
        setEventId(eventId);
        setShowInfoDialog(true);
    };
    


    return (
        <div className="band-invitations">
            {
                events.map(event => (
                    <AppliedEventItem event={event} onCancel={() => confirmCancelEvent(event.eventId)} onSelectEvent={() => showEventPopup(event.eventId)}/>
                ))
            }
            <Dialog isOpen={showCancelDialog} onClose={() => setShowCancelDialog(false)}>
                <ConfirmDialog title="Cancel Event" question="This will withdraw you from event! this action can't be undone" callback={cancelEvent}/>
            </Dialog>
            <Dialog isOpen={showInfoDialog} onClose={() => setShowInfoDialog(false)}>
                { eventId && <EventInfoDialog eventId={eventId} onClose={() => setShowInfoDialog(false)}/> }
            </Dialog>
        </div>
    )
}

export default MyEvents;