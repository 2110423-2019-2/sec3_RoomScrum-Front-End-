import React from 'react';
import { ConfirmButton } from './base/confirm-button';
import request from 'superagent';
import config from 'src/config';
import { Button } from '../common';

const AcceptPaymentButton = ({children, className, eventId, onSuccess, onFail}) => {
    const acceptPayment = () => {
        if (!eventId) alert("Accept Payment: No eventId supplied");
        request.get(config.API_URL + '/events/receive-payment/' + eventId)
        .withCredentials()
        .then(res => {
            alert("Receive payment OK");
            onSuccess && onSuccess(res);
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
        children={children || <Button type="primary" name="Accept Payment"/>}
        action={acceptPayment}
        className={className}
        title={"Accept Payment"}
        question={"Confirm that hirer has paid you event fee?"}
    />
}

export default AcceptPaymentButton;