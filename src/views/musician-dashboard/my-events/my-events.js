import React, {useState, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

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


const AppliedEventItem = ({event: {
    name,
    eventId,
    status,
    district, province,
    hirerName, // computed ?
    contractStatus, // computed ?
    price, // computed ?
}, onAccept, onReject}) => {
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
                <button>
                    <FontAwesomeIcon icon={faExclamationTriangle}/>
                    cancel
                </button>
            </div>
        </div>
    )
}

const MyEvents = () => {
    const [events, setEvents] = useState([]);
    const isFetch = useRef(false);
    // const targetBand = useRef(null); // use Ref to prevent to many state
    // const [showAcceptDialog, setShowAcceptDialog] = useState(false);
    // const [showRejectDialog, setShowRejectDialog] = useState(false);


    // const fetchBands = () => {
    //     setBands(Array(10).fill(0).map(() => {
    //         return {...fakeBand};
    //     }))
    // }

    // if (!isFetch.current) {
    //     isFetch.current = true;
    //     fetchBands();
    // }

    // const confirmAcceptBand = (bandId) => {
    //     targetBand.current = bandId;
    //     setShowAcceptDialog(true);
    // }

    // const confirmRejectBand = (bandId) => {
    //     targetBand.current = bandId;
    //     setShowRejectDialog(true);
    // }

    // const acceptBand = (confirmed) => {
    //     // always hide dialog
    //     setShowAcceptDialog(false);
    //     if (!confirmed) return;
    //     alert("Confirm " + targetBand.current + " success!")
    // }

    // const rejectBand = (confirmed) => {
    //     // always hide dialog
    //     setShowRejectDialog(false);
    //     if (!confirmed) return;
    //     alert("Reject " + targetBand.current + " success!")
    // }
    


    return (
        <div className="band-invitations">
            <AppliedEventItem event={{
                name: "SE Miniconert 2020",
                status: "Approved",
                contractStatus: "In contract",
                district: "Muang",
                province: "Chon Buri",
                eventId: 1,
                hirerName: "John Doge",
                price: 999999,
            }}/>
            {/* {
                bands.map(band => (
                    <BandInvitationItem band={band} onAccept={confirmAcceptBand} onReject={confirmRejectBand}/>
                ))
            }
            <Dialog isOpen={showAcceptDialog} onClose={() => setShowAcceptDialog(false)}>
                <ConfirmDialog title="Accept band request" question="Do you want to join this band?" callback={acceptBand}/>
            </Dialog>
            <Dialog isOpen={showRejectDialog} onClose={() => setShowRejectDialog(false)}>
                <ConfirmDialog title="Reject band request" question="Reject and remove this invitation? you can't join unless you're invited again" callback={rejectBand}/>
            </Dialog> */}
        </div>
    )
}

export default MyEvents;