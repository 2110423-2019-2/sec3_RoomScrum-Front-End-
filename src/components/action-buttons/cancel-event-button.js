import React from 'react';
import { ConfirmButton } from './base/confirm-button';
import request from 'superagent';
import config from 'src/config';
import { Button } from 'src/components/common';

// logic wrapper for complete event, you need to supply the children

const CancelEventButton = ({children, className, eventId, onSuccess, onFail}) => {
    const cancelEvent = () => {
        if (!eventId) alert("Cancel Event: No eventId supplied");
        request.delete(config.API_URL + `/application/${eventId}/cancel-my-application`)
            .withCredentials()
            .then(res => {
                alert("Cancelled Event");
                onSuccess && onSuccess(res);
            })
            .catch(err => {
                alert("Error Cancelling Event");
                console.group("Error Cancelling Event");
                console.log("event id:", eventId);
                console.error(err);
                console.groupEnd();

                onFail && onFail(err);
            })
    }
    
    return <ConfirmButton
        children={children || <Button type="danger" name="Cancel Event"/>} // default button
        action={cancelEvent}
        className={className}
        title={"Cancel Event"}
        question={"This will withdraw you from event! this action can't be undone"}
    />
}

export default CancelEventButton;