import React, { useState, useRef } from 'react';
import Dialog from 'src/components/common/dialog';
import ConfirmDialog from 'src/components/common/confirm-dialog-v2';
import Image from 'react-image';
import classNames from 'classnames';

import './my-applications.scss';
import ApplicationInfo from './application-info';
import request from 'superagent';
import config from 'src/config';
import { HireeEventStatusIndicator, PaymentStatusIndicator, ContractStatusIndicator } from 'src/components/event-item/status-indicator/status-indicator';
import { sortByTimestampDesc } from '../util';
import { ApplicationStatus, EventStatus } from 'src/enums';
import { AppliedEventAction } from '../components';
import PaymentQRDialog from 'src/components/payment';
import { HireeContract } from 'src/components/contract';
import { ConfirmButton } from 'src/components/action-buttons/base/confirm-button';
import { CompleteEventButton } from 'src/components/action-buttons';



const AppliedEventItem = ({
    application, 
    onSelectEvent,
    // when click action buttons
    onCancel, 
    onWithdraw, // withdraw is same as cancel but w/o penalty 
    onAcceptPayment,
    onClickPay,
}) => {
    const {
        status: applicationStatus,
        event: {
            eventName,
            eventId,
            status: eventStatus,
            district, province,
            userId: hirerId,
            price,
            contractStatus,
            user: { // hirer
                firstName, lastName
            }
        }
    } = application;
    console.log(application);
    return (
        <div className={
            classNames({
                "applied-event-item clearfix": true,
                "cancelled": applicationStatus == ApplicationStatus.APPLICATION_REJECTED || eventStatus == EventStatus.CANCELLED
            })
        }>
            <div className="event-image-container">
                <Image className="event-image" src={[
                    config.API_URL + `/events/${eventId}/pic`,
                    'https://i.pravatar.cc/180',
                ]} loader={<div className="event-image placeholder"></div>}
                />
                <div className="banner-container">
                    <div className={
                        classNames({
                            "banner": true,
                            "show": eventStatus == EventStatus.COMPLETE || 
                            eventStatus == EventStatus.CANCELLED ||
                            applicationStatus == ApplicationStatus.APPLICATION_REJECTED,
                        })
                    }>
                        {
                            (() => {
                                if (eventStatus == EventStatus.COMPLETE) return "Completed";
                                if (eventStatus == EventStatus.CANCELLED) return "Cancelled";
                                if (applicationStatus == ApplicationStatus.APPLICATION_REJECTED) return "Rejected";
                            })()
                        }
                    </div>
                </div>
            </div>
            <div className="event-info">
                <div className="event-name" onClick={onSelectEvent}> {eventName} </div>
                <div className="desc">
                    <div className="label"> Your status </div>
                    <div className="value">
                        <HireeEventStatusIndicator
                            eventStatus={eventStatus}
                            applicationStatus={applicationStatus}
                        />
                    </div>
                </div>
                <div className="desc">
                    <div className="label"> Contract Status </div>
                    <div className="value">
                        {/** TODO */}
                        <HireeContract eventId={eventId} application={application} />
                          <ContractStatusIndicator contractStatus={"TODO"} />
                    </div>
                </div>
                <div className="desc">
                    <div className="label"> Payment Status </div>
                    <div className="value">
                        {/** TODO */}
                        <PaymentStatusIndicator eventStatus={eventStatus}/>
                    </div>
                </div>
                <div className="desc">
                    <div className="label"> District </div>
                    <div className="value"> {district}</div>
                </div>
                <div className="desc">
                    <div className="label"> Province </div>
                    <div className="value"> {province}</div>
                </div>
                <div className="desc">
                    <div className="label"> Hirer </div>
                    <div className="value"> {firstName + ' ' + lastName} </div>
                </div>
                <AppliedEventAction
                    application={application}
                    onAcceptPayment={onAcceptPayment}
                    onCancel={onCancel}
                    onWithdraw={onWithdraw}
                    onClickPay={onClickPay}
                />
            </div>
            <div className="price-tag">
                <div className="price"> {price || 'price ????'}</div>
                <div className="currency"> baht </div>
            </div>
        </div>
  );
};

const fakePaymentInfo = {accountNo: "1234567890123", amount: "123.33", name: "road"};

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const isFetch = useRef(false);
    const targetEvent = useRef(null); // use Ref to prevent to many state
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [showAcceptPaymentDialog, setShowAcceptPaymentDialog] = useState(false);
    const [showInfoDialog, setShowInfoDialog] = useState(false);
    const [applicationToShow, setApplicationToShow] = useState(null);
    
    const [showQRDialog, setShowQRDialog] = useState(false);
    const [qrData, setQrData] = useState({});

    const {
        accountNo, amount, name
    } = qrData;

  const fetchApplications = () => {
    request
      .post(config.API_URL + '/application/my-application') // get my applications, with event detail
      .send({
        status: [
          ApplicationStatus.APPLICATION_REJECTED,
          ApplicationStatus.IS_ACCEPTED,
          ApplicationStatus.IS_APPLIED
        ]
      })
      .withCredentials()
      .then(res => {
        const applications = res.body;
        applications.sort(sortByTimestampDesc);
        setApplications(applications);
      })
      .catch(err => {
        alert('Error getting applied events ');
        console.error('Error: Fetch applied events');
      });
  };

  if (!isFetch.current) {
    isFetch.current = true;
    fetchApplications();
  }

    if (!isFetch.current) {
        isFetch.current = true;
        fetchApplications();
    }

    // set target event id then show dialog
    const confirmCancelApplicationOf = (eventId) => {
        targetEvent.current = eventId;
        setShowCancelDialog(true);
    }

    const confirmAcceptPaymentOf = (eventId) => {
        targetEvent.current = eventId;
        setShowAcceptPaymentDialog(true);
    }

    // cancel application of specified event
    const cancelEvent = (confirmed) => {
        // always hide dialog
        setShowCancelDialog(false);
        if (!confirmed) return;
        request.delete(config.API_URL + `/application/${targetEvent.current}/cancel-my-application`)
        .withCredentials()
        .then(res => {
            // too lazy to optimize API request
            fetchApplications();
        })
        .catch(err => {
            alert("error canceling application" + err.response.text);
            console.error("error canceling application" + err.response.body)
        })
    }

    const acceptPayment = (confirmed) => {
        setShowAcceptPaymentDialog(false);
        if (!confirmed) return;
        request.get(config.API_URL + '/events/receive-payment/' + targetEvent.current)
        .withCredentials()
        .then(res => {
            alert("Receive payment OK");
            fetchApplications();
        })
        .catch(err => {
            alert("Receive payment Error");
            console.error("Receive payment Error", err);
        })
    }

    const showApplicationPopup = (application) => {
        console.log("show application", application);
        setApplicationToShow(application);
        setShowInfoDialog(true);
    };

    // show and set data
    const showPromptPayDialog = (paymentInfo) => {
        setShowQRDialog(true);
        setQrData(paymentInfo);
    }

    return (
        <div className="band-invitations">
            {
                applications.map(application => (
                    <>
                        <AppliedEventItem
                            application={application}
                            onCancel={() => confirmCancelApplicationOf(application.eventId)}
                            onSelectEvent={() => showApplicationPopup(application)}
                            onWithdraw={() => confirmCancelApplicationOf(application.eventId)/* TODO: this should we different API but whatever */}
                            onAcceptPayment={() => confirmAcceptPaymentOf(application.eventId)}
                            onClickPay={() => showPromptPayDialog(fakePaymentInfo)}
                        />
                    </>
                ))
            }
            <Dialog isOpen={showCancelDialog} onClose={() => setShowCancelDialog(false)}>
                <ConfirmDialog title="Cancel Event" question="This will withdraw you from event! this action can't be undone" callback={cancelEvent} />
            </Dialog>
            <Dialog isOpen={showAcceptPaymentDialog} onClose={() => setShowAcceptPaymentDialog(false)}>
                <ConfirmDialog title="Accept Payment" question="Confirm that hirer has paid you event fee?" callback={acceptPayment}/>
            </Dialog>
            <Dialog isOpen={showInfoDialog} onClose={() => setShowInfoDialog(false)}>
                {applicationToShow && <ApplicationInfo application={applicationToShow} onClose={() => setShowInfoDialog(false)} onCancel={() => confirmCancelApplicationOf(applicationToShow.eventId)} />}
            </Dialog>
            <Dialog isOpen={showQRDialog} onClose={() => setShowQRDialog(false)}>
                <PaymentQRDialog
                    accountNo={accountNo}
                    amount={amount}
                    name={name}
                    onClose={() => setShowQRDialog(false)}
                />
            </Dialog>
        </div>
    )
}

export default MyApplications;
