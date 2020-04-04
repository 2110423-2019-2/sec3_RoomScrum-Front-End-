import React from 'react';
import { ConfirmButton } from './base/confirm-button';
import request from 'superagent';
import config from 'src/config';
import { Button } from '../common';

const AcceptInvitationButton = ({children, className, eventId, onSuccess, onFail}) => {
    const acceptInvitation = () => {
        if (!eventId) alert("Accept Invitation: No eventId supplied");
        request.post(config.API_URL + `/application/${eventId}/accept-invitation`)
        .withCredentials()
        .then(res => {
            alert("Accept Invitation OK");
            onSuccess && onSuccess(res);
        })
        .catch(err => {
            alert("Error: Accepting Invitation");
            console.group("Error Accepting Invitation");
            console.log("event id:", eventId);
            console.error(err);
            console.groupEnd();

            onFail && onFail();
        })
    }
    
    return <ConfirmButton
        children={children || <Button type="primary" name="Accept Invitation"/>}
        action={acceptInvitation}
        className={className}
        title={"Accept event request"}
        question={"Do you want to apply for this event?"}
    />
}

export default AcceptInvitationButton;