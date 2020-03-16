import React, {useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Dialog from 'src/components/common/dialog';
import ConfirmDialog from 'src/components/common/confirm-dialog-v2';

import './my-events.scss';

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

const Indicator = ({color}) => {
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
    }, onCancel // when click cancel
}) => {
    return (
        
        <div className="applied-event-item clearfix">
            <img className="event-image" src="https://i.pravatar.cc/160"/>
            <div className="event-info">
                <div className="event-name"> {name} </div>
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
                        <button className="link-btn"> view contract </button>
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
                <button onClick={() => onCancel(eventId)}>
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
    // const [showRejectDialog, setShowRejectDialog] = useState(false);


    
    const fetchEvents = () => {
        setEvents(Array(10).fill(0).map(() => {
            return {...fakeEvent};
        }))
    }

    if (!isFetch.current) {
        isFetch.current = true;
        fetchEvents();
    }

    // const confirmAcceptBand = (bandId) => {
    //     targetBand.current = bandId;
    //     setShowAcceptDialog(true);
    // }

    const confirmCancelEvent = (eventId) => {
        targetEvent.current = eventId;
        setShowCancelDialog(true);
    }

    // const acceptBand = (confirmed) => {
    //     // always hide dialog
    //     setShowAcceptDialog(false);
    //     if (!confirmed) return;
    //     alert("Confirm " + targetBand.current + " success!")
    // }

    const cancelEvent = (confirmed) => {
        // always hide dialog
        setShowCancelDialog(false);
        if (!confirmed) return;
        alert("cancel " + targetEvent.current + " success!")
    }
    


    return (
        <div className="band-invitations">
            {
                events.map(event => (
                    <AppliedEventItem event={event} onCancel={confirmCancelEvent}/>
                ))
            }
            {/* <Dialog isOpen={showAcceptDialog} onClose={() => setShowAcceptDialog(false)}>
                <ConfirmDialog title="Accept band request" question="Do you want to join this band?" callback={acceptBand}/>
            </Dialog> */}
            <Dialog isOpen={showCancelDialog} onClose={() => setShowCancelDialog(false)}>
                <ConfirmDialog title="Cancel Event" question="This will withdraw you from event! this action can't be undone" callback={cancelEvent}/>
            </Dialog>
        </div>
    )
}

export default MyEvents;