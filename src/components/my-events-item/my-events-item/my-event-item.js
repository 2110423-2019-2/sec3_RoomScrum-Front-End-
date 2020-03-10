import React, { useState } from "react";
import Modal from "react-modal";
import "./my-event-item.scss";
import request from "superagent";
import config from "src/config";
import Applicants from "src/views/hirer-dashboard/raw-applied-musicians"



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

  
        <Modal show={show} onHide={handleClose}>
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

const MyEventItem = ({
    each: {
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
    }
  }) => {
    return (
      <div className="card event-item" style={{ width: 200 }}>
        <img
          className="card-img-top"
          src="https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg&w=767"
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
        <div>
          {Applicants}
        </div>
      </div>
    );
  };

  export default MyEventItem;