import React from 'react';
import { ConfirmButton } from './base/confirm-button';
import request from 'superagent';
import config from 'src/config';

const AcceptEventButton = ({children, className, eventId, onSuccess, onFail}) => {
    const completeEvent = () => {
        if (!eventId) alert("Accept Payment: No eventId supplied");
        request.get(config.API_URL + '/events/receive-payment/' + targetEvent.current)
        .withCredentials()
        .then(res => {
            alert("Receive payment OK");
            onSuccess && onSuccess();
        })
        .catch(err => {
            alert("Error: Accepting Payment");
            console.group("Error Accepting Payment");
            console.log("event id:", eventId);
            console.error(err);
            console.groupEnd();

            onFail && onFail();
        })
    }
    
    return <ConfirmButton
        children={children}
        action={completeEvent}
        className={className}
        title={"Accept Payment"}
        question={"Confirm that hirer has paid you event fee?"}
    />
}

export default AcceptEventButton;