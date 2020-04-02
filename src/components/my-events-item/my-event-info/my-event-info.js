import React, { useState } from 'react';
import Modal from 'react-modal';
import request from 'superagent';
import config from 'src/config';
import Applicants from 'src/views/hirer-dashboard/raw-applied-musicians';
import Edit from 'src/views/hirer-dashboard/raw-edit-event';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from 'src/components/common';
import { ConfirmDialog } from 'src/components/common';
import './my-event-info.scss';

const MyEventInfo = ({ event , doDelete}) => {
  const {
    eventId,
    eventName,
    status,
    hirerId,
    description,
    address,
    subdistrict,
    district,
    province,
    country,
    zipcode,
    startdatetime,
    enddatetime,
    isCancelled,
    eventImage,
    userId
  } = event;

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
    console.log('openModal');
  };
  const afterOpenModal = () => {};
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <h1 onClick={openModal}>{event.eventName}</h1>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel='Modal'>
        <div className='row'>
          <div className='EventInfo col-6'>
            <h1 className='text-center font-weight-bold'>{event.eventName}</h1>
            <img
              className='responsive'
              src={event.eventImage}
              alt='Card image cap'
            />
            <h6>Time</h6>
            <p1>{event.startdatetime.substr(11,8)} {event.startdatetime.substr(0,10)} to {event.enddatetime.substr(11,8)} {event.enddatetime.substr(0,10)}</p1>
            <h6>Location</h6>
            <p1>
              {event.subdistrict} {event.district} {event.province}
            </p1>
            <h6>About</h6>
            <p1>{event.description}</p1>
            <Edit event={event} />
            {/* <button onClick={() => doDelete(event.eventId)} > Cancel </button> */}
          </div>
          <div className='AppliedMusician col-5'>
            <Applicants eventId={event.eventId} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyEventInfo;
