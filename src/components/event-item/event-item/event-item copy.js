import React, { useState } from "react";
import ReactModal from "react-modal";
import { Modal, Button } from "react-bootstrap";
import "./event-item.scss";
import request from "superagent";
import config from "src/config";

const MoreDetailModal = ({
  description,
  startdatetime,
  enddatetime,
  eventId
}) => {
  const [show, setShow] = useState(false);
  const formdata = {
    hireeId: 14,
    eventId: eventId,
    timestamp: new Date().toISOString(),
    status: 2
  };

  const handleApply = () => {
    request
      .post(`${config.API_URL}/application/apply`)
      .send(formdata)
      .then(res => {
        console.log(res.text);
      })
      .catch(err => {
        alert("err" + err);
      });
    setShow(false);
  };

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="btn-primary" onClick={handleShow}>
        More details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Event detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{description}</p>
          <p>{startdatetime}</p>
          <p>{enddatetime}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApply}>
            apply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const EventItem = ({
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
        <h5 className="card-title">{eventName} </h5>
        <p className="card-text">
          {address},{subdistrict}
        </p>
        <p className="card-text">
          {district},{province}
        </p>
        <p className="card-text">
          {country},{zipcode}
        </p>

        <MoreDetailModal
          description={description}
          startdatetime={startdatetime}
          enddatetime={enddatetime}
        />
      </div>
    </div>
  );
};

export default EventItem;
