import React, { useRef, useState } from 'react';
import './event-invitations.scss';
import ConfirmDialog from 'src/components/common/confirm-dialog-v2'
import Dialog from 'src/components/common/dialog'
import config from 'src/config';
import request from 'superagent';
import { ApplicationStatus } from 'src/enums';
import Image from 'react-image';

const EventInvitationItem = ({invitation: {
    // TODO: more fields
    eventId,
    event: {
        eventName,
        description,
    }
}, onAccept, onReject}) => {
    // TODO: wait for design
    return (
        <div className="event-invite-item clearfix">
            <Image className="event-image"
                src={[
                    config.API_URL + `/events/${eventId}/pic`,
                    "https://i.pravatar.cc/120",
                ]}
            />
            <div className="event-info">
                <div className="name"> {eventName} </div>
                <div className="bio"> {description} </div>
            </div>
            <div className="action-btns">
                <button className="reject" onClick={onReject}> Reject </button>
                <button className="accept" onClick={onAccept}> Accept </button>
            </div>
        </div>
    )
}

const fakeEvent = {
    name: "Foo event",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda \
    nulla consectetur, modi cum aut optio voluptate quod fugit magnam libero \
    quasi corporis alias, recusandae tempora explicabo. Commodi veniam perferendis in.",
    eventId: 1,
}

const EventInvitations = () => {
    const [invitations, setInvitations] = useState([]);
    const isFetch = useRef(false);
    const targetInvitation = useRef(null); // use Ref to prevent to many state
    const [showAcceptDialog, setShowAcceptDialog] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);


    const fetchInvitations = () => {
        request.post(config.API_URL + '/application/my-application')
        .withCredentials()
        .send({status: [ApplicationStatus.IS_INVITED]})
        .then(res => {
            setInvitations(res.body);
        })
        .catch(err => {
            alert("error getting invitations " + err.response.text);
            console.error("error getting response", err);
        })
    }

    if (!isFetch.current) {
        isFetch.current = true;
        fetchInvitations();
    }

    const confirmAcceptInvitation = (eventId) => {
        targetInvitation.current = eventId;
        setShowAcceptDialog(true);
    }

    const confirmRejectInvitation = (eventId) => {
        targetInvitation.current = eventId;
        setShowRejectDialog(true);
    }


    // TODO: wait for API
    const acceptEvent = (confirmed) => {
        // always hide dialog
        setShowAcceptDialog(false);
        if (!confirmed) return;
        request.post(config.API_URL + `/application/${targetInvitation.current}/accept-invitation`)
        .withCredentials()
        .then(res => {
            // too lazy to optimize API request
            fetchInvitations();
        })
        .catch(err => {
            alert("error accepting invitation" + err.response.text);
            console.error("error accepting invitation" + err.response.body)
        })
    }

    // TODO: wait for API
    const rejectEvent = (confirmed) => {
        // always hide dialog
        setShowRejectDialog(false);
        if (!confirmed) return;
        request.delete(config.API_URL + `/application/${targetInvitation.current}/cancel-my-application`)
        .withCredentials()
        .then(res => {
            // too lazy to optimize API request
            fetchInvitations();
        })
        .catch(err => {
            alert("error declining invitation" + err.response.text);
            console.error("error declining invitation" + err.response.body)
        })
    }
    


    return (
        <div className="event-invitations">
            {
                invitations.map(invitation => (
                    <EventInvitationItem
                        invitation={invitation}
                        onAccept={() => confirmAcceptInvitation(invitation.eventId)}
                        onReject={() => confirmRejectInvitation(invitation.eventId)}/>
                ))
            }
            <Dialog isOpen={showAcceptDialog} onClose={() => setShowAcceptDialog(false)}>
                <ConfirmDialog title="Accept event request" question="Do you want to join this event?" callback={acceptEvent}/>
            </Dialog>
            <Dialog isOpen={showRejectDialog} onClose={() => setShowRejectDialog(false)}>
                <ConfirmDialog title="Reject event request" question="Reject and remove this invitation? you can't join unless you're invited again" callback={rejectEvent}/>
            </Dialog>
        </div>
    )
}

export default EventInvitations