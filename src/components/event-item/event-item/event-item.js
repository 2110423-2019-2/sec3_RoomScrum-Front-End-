import React, { useState } from 'react';
import Modal from 'react-modal';
import './event-item.scss';
import request from 'superagent';
import config from 'src/config';
import Image from 'react-image';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const MoreDetailModal = ({
  eventId,
  description,
  startdatetime,
  enddatetime,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const afterOpenModal = () => {};
  const closeModal = () => {
    setIsOpen(false);
  };
  const formdata = {
    eventId: eventId,
  };
  const handleApply = () => {
    request
      .post(`${config.API_URL}/application/apply`)
      .withCredentials()
      .send(formdata)
      .then((res) => {
        console.log(res.text);
      })
      .catch((err) => {
        alert('err' + err);
      });
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Modal'>
        <div>
          <p>{description}</p>
          <p>{startdatetime}</p>
          <p>{enddatetime}</p>
          <button
            type='button'
            class='btn btn-primary float-right'
            onClick={handleApply}>
            Apply
          </button>
        </div>
      </Modal>
    </div>
  );
};

const EventItem = ({
  each: {
    eventId,
    eventName,
    description,
    address,
    subdistrict,
    district,
    province,
    country,
    zipcode,
    startdatetime,
    enddatetime,
    eventImage,
  },
}) => {
  return (
    <div className='card event-item' style={{ width: 200 }}>
      <Image
        className='card-img-top'
        src={[
          config.API_URL + `/events/${eventId}/pic`,
          'https://i.pravatar.cc/180',
        ]}
        loader={<div className='event-image placeholder'></div>}
      />
      <div className='card-body'>
        <h5 className='card-title'>{eventName} </h5>
        <p className='card-text'>
          {address},{subdistrict}
        </p>
        <p className='card-text'>
          {district},{province}
        </p>
        <p className='card-text'>
          {country},{zipcode}
        </p>
        <MoreDetailModal
          eventId={eventId}
          description={description}
          startdatetime={startdatetime}
          enddatetime={enddatetime}
        />
      </div>
    </div>
  );
};

export default EventItem;
