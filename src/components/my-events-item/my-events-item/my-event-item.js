import React, { useState } from "react";
import Modal from "react-modal";
import "./my-event-item.scss";
import request from "superagent";
import config from "src/config";
import Applicants from "src/views/hirer-dashboard/raw-applied-musicians"
import Edit from "src/views/hirer-dashboard/raw-edit-event"





const EventInfoModal = ({
    eventName,
    description,
    address,
    subdistrict,
    district,
    province,
    country,
    zipcode,
    startdatetime,
    enddatetime
  }) => {
    const [show, setShow] = useState(false);

  
    const handleClose = () => setShow(false);
  
    const handleShow = () => setShow(true);
  
    return (
      <div>

  
        <Modal show={handleShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Event Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{eventName}</p>
            <p>{description}</p>
            <p>{address}</p>
            <p>{subdistrict}</p>
            <p>{district}</p>
            <p>{province}</p>
            <p>{country}</p>
            <p>{zipcode}</p>
            <p>{startdatetime}</p>
            <p>{enddatetime}</p>
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

const MyEventItem = ({
    each , onClick
  }) => {
    const {
      eventId,
      eventName,
      // eventId,
      // hirerId,
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
    return (
      <div className="card event-item" style={{ width: 250 }}>
        <img
          className="card-img-top"
          src={eventImage}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title" onClick={EventInfoModal}>{eventName} </h5>
 
  
          <EventInfoModal
            eventName={eventName}
            description={description}
            address={address}
            subdistrict={subdistrict}
            district={district}
            province={province}
            country={country}
            zipcode={zipcode}
            startdatetime={startdatetime}
            enddatetime={enddatetime}
          />
        </div>
        <div className = 'row' >
          <Edit event={each}/>
          <Applicants eventId={eventId}/>
          <button variant='secondary' onClick={() => onClick(eventId)}>
            Cancel
          </button>
        </div>
      </div>
        
    );
  };

  export default MyEventItem;