import React, { useState, useRef } from 'react';
import Image from 'react-image';
import classNames from 'classnames';

import './my-applications.scss';
import request from 'superagent';
import config from 'src/config';
import {
  HireeEventStatusIndicator,
  PaymentStatusIndicator,
  ContractStatusIndicator,
} from 'src/components/event-item/status-indicator/status-indicator';
import { sortByTimestampDesc } from '../util';
import { ApplicationStatus, EventStatus } from 'src/enums';
import { AppliedEventAction } from '../components';
import { HireeContract } from 'src/components/contract';
import { ViewEventInfoButton } from 'src/components/action-buttons/view-event-info-button';

const AppliedEventItem = ({ application, refreshCallback }) => {
  application.contract = application.event.contract
    ? application.event.contract
    : { status: 'NotActive' };

  application.event.price = application.event.price
    ? application.event.price
    : 10000;

  const {
    status: applicationStatus,
    contract: { status: contractStatus },
    event: {
      eventName,
      eventId,
      status: eventStatus,
      district,
      province,
      userId: hirerId,
      price,
      user: {
        // hirer
        firstName,
        lastName,
      },
    },
  } = application;

  // application.contract = application.event.contract
  //   ? application.event.contract
  //   : { status: 'NotActive' };

  // application.event.price = application.event.price
  //   ? application.event.price
  //   : 10000;

  // const contractStatus = application.contract.status;

  // console.log(application);

  return (
    <div
      className={classNames({
        'applied-event-item clearfix': true,
        cancelled:
          applicationStatus == ApplicationStatus.APPLICATION_REJECTED ||
          eventStatus == EventStatus.CANCELLED,
      })}>
      <div className='event-image-container'>
        <Image
          className='event-image'
          src={[
            config.API_URL + `/events/${eventId}/pic`,
            'https://i.pravatar.cc/180',
          ]}
          loader={<div className='event-image placeholder'></div>}
        />
        <div className='banner-container'>
          <div
            className={classNames({
              banner: true,
              show:
                eventStatus == EventStatus.COMPLETE ||
                eventStatus == EventStatus.CANCELLED ||
                applicationStatus == ApplicationStatus.APPLICATION_REJECTED,
            })}>
            {(() => {
              if (eventStatus == EventStatus.COMPLETE) return 'Completed';
              if (eventStatus == EventStatus.CANCELLED) return 'Cancelled';
              if (applicationStatus == ApplicationStatus.APPLICATION_REJECTED)
                return 'Rejected';
            })()}
          </div>
        </div>
      </div>
      <div className='event-info'>
        <ViewEventInfoButton application={application}>
          <div className='event-name'> {eventName} </div>
        </ViewEventInfoButton>
        <div className='desc'>
          <div className='label'> Your status </div>
          <div className='value'>
            <HireeEventStatusIndicator
              eventStatus={eventStatus}
              applicationStatus={applicationStatus}
            />
          </div>
        </div>
        <div className='desc'>
          <div className='label'> Contract Status </div>
          <div className='value'>
            {/** TODO
              <ContractStatusIndicator contractStatus={'TODO'} />
             */}
            <ContractStatusIndicator contractStatus={contractStatus} />
            {(() => {
              // console.log(contractStatus);
              return contractStatus == 'NotActive' ? null : (
                <HireeContract eventId={eventId} application={application} />
              );
              // applications.map((application) => (
              //   <>
              //     <HireeContract
              //       eventId={eventId}
              //       application={application}
              //     />
              //   </>
              // ));
            })()}
          </div>
        </div>
        <div className='desc'>
          <div className='label'> Payment Status </div>
          <div className='value'>
            {/** TODO */}
            <PaymentStatusIndicator eventStatus={eventStatus} />
          </div>
        </div>
        <div className='desc'>
          <div className='label'> District </div>
          <div className='value'> {district}</div>
        </div>
        <div className='desc'>
          <div className='label'> Province </div>
          <div className='value'> {province}</div>
        </div>
        <div className='desc'>
          <div className='label'> Hirer </div>
          <div className='value'> {firstName + ' ' + lastName} </div>
        </div>
        <AppliedEventAction
          application={application}
          debug={true}
          refreshCallback={refreshCallback}
        />
      </div>
      <div className='price-tag'>
        <div className='price'> {price.toLocaleString()}</div>
        <div className='currency'> baht </div>
      </div>
    </div>
  );
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const isFetch = useRef(false);

  const fetchApplications = () => {
    request
      .post(config.API_URL + '/application/my-application') // get my applications, with event detail
      .send({
        status: [
          ApplicationStatus.APPLICATION_REJECTED,
          ApplicationStatus.IS_ACCEPTED,
          ApplicationStatus.IS_APPLIED,
        ],
      })
      .withCredentials()
      .then((res) => {
        const applications = res.body;
        applications.sort(sortByTimestampDesc);
        setApplications(applications);
        //OIL
        // console.log(res.body);
        //OIL
      })
      .catch((err) => {
        alert('Error getting applied events ');
        console.error('Error: Fetch applied events');
      });
  };

  if (!isFetch.current) {
    isFetch.current = true;
    fetchApplications();
  }

  return (
    <div className='band-invitations'>
      {applications.map((application) => (
        <>
          <AppliedEventItem
            application={application}
            refreshCallback={fetchApplications} // on success -> fetch appl.
          />
        </>
      ))}
    </div>
  );
};

export default MyApplications;
