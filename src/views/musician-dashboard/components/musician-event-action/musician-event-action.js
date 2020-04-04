import React from 'react';
import { EventStatus, ApplicationStatus } from 'src/enums';
import { Button } from 'src/components/common';
import './musician-event-action.scss';
import { CompleteEventButton } from 'src/components/action-buttons';

// Hiree side
const MusicianEventAction = ({application, onWithdraw, onCancel, onAcceptPayment, onClickPay}) => {
    const {
        status: applicationStatus,
        event: {
            status: eventStatus,
        }
    } = application;

    const canCancel = !(eventStatus == EventStatus.COMPLETE || eventStatus == EventStatus.CANCELLED);
    const canWithdraw = applicationStatus == ApplicationStatus.IS_APPLIED && canCancel;
    const canAcceptPayment = eventStatus == EventStatus.PAYMENT_PENDING;

    return (
        <div className="musician-event-actions">
            {canAcceptPayment && <Button type="primary" name="Accept Payment" onClick={onAcceptPayment}/>}
            {canWithdraw && <Button type="danger" name="Withdraw" onClick={onWithdraw}/>}
            {canCancel && !canWithdraw && <Button type="danger" name="Cancel" onClick={onCancel}/>}
            {
                // test Hirer event action
                <Button type="primary" name="[test] Pay" onClick={onClickPay}/>
            }
            <CompleteEventButton
                className="parent"
                eventId={application.eventId}
                onFail={() => alert("Extra fail")}
                onSuccess={() => alert("Extra success")}
            />
        </div>
    )
};

export default MusicianEventAction;