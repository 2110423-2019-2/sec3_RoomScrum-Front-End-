import React from 'react';
import { ConfirmButton } from './base/confirm-button';
import request from 'superagent';
import config from 'src/config';
import { Button } from '../common';

const RejectInvitationButton = ({children, className, eventId, onSuccess, onFail}) => {
    const rejectInvitation = () => {
        if (!eventId) alert("Reject Invitation: No eventId supplied");
        request.delete(config.API_URL + `/application/${eventId}/cancel-my-application`)
        .withCredentials()
        .then(res => {
            alert("Reject Invitation OK");
            onSuccess && onSuccess(res);
        })
        .catch(err => {
            alert("Error: Rejecting Invitation");
            console.group("Error Rejecting Invitation");
            console.log("event id:", eventId);
            console.error(err);
            console.groupEnd();

            onFail && onFail();
        })
    }
    
    return <ConfirmButton
        children={children || <Button type="danger" name="Reject Invitation"/>}
        action={rejectInvitation}
        className={className}
        title={"Reject event request"}
        question={"Do you want to apply for this event?"}
    />
}

export default RejectInvitationButton;