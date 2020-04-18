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
import Image from 'react-image';

const MyEventInfo = ( {each} ) => {
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
  } = each;

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
      <div onClick = {openModal} className='head-text'>
        {each.eventName}
      </div>


      <Modal
        isOpen = {isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}>
        <div className='row'>
          <div className='EventInfo col-6'>
            <h1 className='text-center font-weight-bold'>{each.eventName}</h1>
            <Image className='event-image' src={[
                config.API_URL + `/events/${each.eventId}/pic`]}  />
            <h6>Time</h6>
            <p1>{each.startdatetime.substr(11,8)} {each.startdatetime.substr(0,10)} to {each.enddatetime.substr(11,8)} {each.enddatetime.substr(0,10)}</p1>
            <h6>Location</h6>
            <p1>
              {each.subdistrict} {each.district} {each.province}
            </p1>
            <h6>About</h6>
            <p1>{each.description}</p1>
            <div className='edit'>
              <Edit  event={each} />
            </div>
            {/* <button onClick={() => doDelete(event.eventId)} > Cancel </button> */}
          </div>
          <div className='AppliedMusician col-5'>
            <Applicants eventId={each.eventId} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyEventInfo;
