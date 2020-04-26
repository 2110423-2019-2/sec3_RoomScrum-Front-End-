import React, { useState } from "react";
import Modal from "react-modal";
import "./event-item.scss";
import request from "superagent";
import config from "src/config";
import Image from "react-image";
import EventItemInfo from "./event-item-info"

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
    hirerName,
  },
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
  const customStyles = {
    content: {
      // top                   : '50%',
      // left                  : '50%',
      // right                 : 'auto',
      // bottom                : 'auto',
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: "auto",
      marginBottom: "auto",
      //   transform             : 'translate(-50%, -50%)',
      width: "40%",
      height: "50%",
    },
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
        alert("err" + err);
      });
    setIsOpen(false);
  };

  return (
    <div className="card event-item" onClick={openModal} style={{ width: 200 }}>
      <div className="EventNameContainer">
        <div className="EventName">{eventName}</div>
      </div>
      <Image
        className="card-img-top"
        style={{
          width: 195,
          height: 195,
        }}
        src={[
          config.API_URL + `/events/${eventId}/pic`,
          "https://i.pravatar.cc/180",
        ]}
        loader={<div className="event-image placeholder"></div>}
      />
      <div className=" Description">
        <div className="Label">Time</div>
        <div className="Value">
          {startdatetime.substr(11, 8)} {startdatetime.substr(0, 10)} to{" "}
          {enddatetime.substr(11, 8)} {enddatetime.substr(0, 10)}
        </div>
        <div className="Label">Subdistrict</div>
        <div className="Value">{subdistrict}</div>
        <div className="Label">District</div>
        <div className="Value">{district}</div>

        <Modal
          isOpen={isOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <EventItemInfo description={description} eventId={eventId}/>
        </Modal>
      </div>
    </div>
  );
};

export default EventItem;
