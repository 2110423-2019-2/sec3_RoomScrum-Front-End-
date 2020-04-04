import React, { useState } from 'react';
import { ConfirmButton } from './base/confirm-button';
import request from 'superagent';
import config from 'src/config';

// logic wrapper for complete event, you need to supply the children

const CompleteEventButton = ({children, className, eventId, onSuccess, onFail}) => {
    const completeEvent = () => {
        if (!eventId) alert("Completed Event: No eventId supplied");
        request.post(config.API_URL + `/event/${eventId}/complete`)
            .withCredentials()
            .then(res => {
                alert("Completed Event OK");
                onSuccess(res);
            })
            .catch(err => {
                alert("Error: Completing Event");
                console.group("Error Completing Event");
                console.log("event id:", eventId);
                console.error(err);
                console.groupEnd();

                onFail(err);
            })
    }
    
    return <ConfirmButton
        children={children}
        action={completeEvent}
        className={className}
        title={"Confirmation"}
        question={"Mark Event Completed ?"}
    />
}

export default CompleteEventButton;