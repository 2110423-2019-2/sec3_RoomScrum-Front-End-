import React from 'react';
import { ConfirmButton } from './base/confirm-button';
import request from 'superagent';
import config from 'src/config';
import { Button } from 'src/components/common';

const ReportButton = ({ children, className, eventId, onSuccess, onFail }) => {
    const reportUser = () => {
        if (!eventId) alert("Applied Event: No eventId supplied");
        request.post(`${config.API_URL}/application/apply`)
            .withCredentials()
            .send({ eventId })
            .then(res => {
                alert("Applied Event OK");
                onSuccess && onSuccess(res);
            })
            .catch(err => {
                alert("Error Applying to Event");
                console.group("Error Applyting to Event");
                console.log("event id:", eventId);
                console.error(err);
                console.groupEnd();

                onFail && onFail(err);
            });
    }

    return <ConfirmButton
        children={children || <Button type="transparent" name="Report" />} // default button
        action={reportUser}
        className={className}
        title={"Apply for this event"}
        question={"You will need to wait for Hirer to confirm your application."}
    />
}

export default ReportButton;