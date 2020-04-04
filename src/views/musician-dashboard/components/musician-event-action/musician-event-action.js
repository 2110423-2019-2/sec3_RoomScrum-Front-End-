import React from 'react';
import { EventStatus, ApplicationStatus } from 'src/enums';
import { Button } from 'src/components/common';
import './musician-event-action.scss';
import { CompleteEventButton } from 'src/components/action-buttons';
import AcceptPaymentButton from 'src/components/action-buttons/accept-payment-button';
import CancelEventButton from 'src/components/action-buttons/cancel-event-button';
import { DialogButton } from 'src/components/action-buttons/base/dialog-button';
import PaymentQRDialog from 'src/components/payment';
import { PayByQRButton } from 'src/components/action-buttons/pay-by-qr-button';

// Hiree side
const MusicianEventAction = ({application, onWithdraw, onCancel, onAcceptPayment, onClickPay}) => {
    const {
        status: applicationStatus,
        event: {
            status: eventStatus,
        }
    } = application;
    
    const eventId = application.eventId;

    const canCancel = !(eventStatus == EventStatus.COMPLETE || eventStatus == EventStatus.CANCELLED);
    const canAcceptPayment = eventStatus == EventStatus.PAYMENT_PENDING;
    const canCompleteEvent = eventStatus == EventStatus.SETTLE; // this should be on hirer!

    return (
        <div className="musician-event-actions">
            { canAcceptPayment && <AcceptPaymentButton eventId={eventId}/> }
            { canCancel && <CancelEventButton eventId={eventId}/> }
            { canCompleteEvent && <CompleteEventButton eventId={eventId} />}
            { canAcceptPayment && <PayByQRButton
                accountNo="1234567890123"
                amount="1999.99"
                displayName="Rodchananat K."
            />}
        </div>
    )
};

export default MusicianEventAction;