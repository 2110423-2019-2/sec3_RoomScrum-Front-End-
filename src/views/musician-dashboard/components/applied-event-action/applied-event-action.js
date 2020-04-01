import React from 'react';
import { EventStatus, ApplicationStatus } from 'src/enums';
import { Button } from 'src/components/common';
import './applied-event-action.scss';

// Hiree side
const AppliedEventAction = ({application, onWithdraw, onCancel, onAcceptPayment, onClickPay}) => {
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
        <div className="applied-event-actions">
            {canAcceptPayment && <Button type="primary" name="Accept Payment" onClick={onAcceptPayment}/>}
            {canWithdraw && <Button type="danger" name="Withdraw" onClick={onWithdraw}/>}
            {canCancel && !canWithdraw && <Button type="danger" name="Cancel" onClick={onCancel}/>}
            {
                // test Hirer event action
                <Button type="primary" name="[test] Pay" onClick={onClickPay}/>
            }
        </div>
    )
};

export default AppliedEventAction;