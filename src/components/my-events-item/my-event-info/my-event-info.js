import React, { useState } from "react";
import Modal from "react-modal";
import request from "superagent";
import config from "src/config";
import Applicants from "src/views/hirer-dashboard/raw-applied-musicians";
import Edit from "src/views/hirer-dashboard/raw-edit-event";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "src/components/common";
import { ConfirmDialog } from "src/components/common";
import "./my-event-info.scss";
import { ApplicationStatus, EventStatus } from "src/enums";
import Image from "react-image";

const MyEventInfo = ({ each, status }) => {
  const {
    eventId,
    eventName,
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
    userId,
  } = each;

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const afterOpenModal = () => {};
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={openModal} className="head-text">
        {each.eventName}
      </div>

      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <div className="Container">
          <div className="EventInfo col-6">
            <div className="Title">{each.eventName}</div>
            <Image
              className="Image"
              src={[config.API_URL + `/events/${each.eventId}/pic`]}
            />
            <div className="Description">
              <div className="Label">Time</div>
              <div className="Value">
                {each.startdatetime.substr(11, 8)}{" "}
                {each.startdatetime.substr(0, 10)} to{" "}
                {each.enddatetime.substr(11, 8)}{" "}
                {each.enddatetime.substr(0, 10)}
              </div>
            </div>
            {/* <h6>Time</h6>
            <p1>{each.startdatetime.substr(11,8)} {each.startdatetime.substr(0,10)} to {each.enddatetime.substr(11,8)} {each.enddatetime.substr(0,10)}</p1> */}
            <div className="Description">
              <div className="Label">Location</div>
              <div className="Value">
                {each.subdistrict} {each.district} {each.province}
              </div>
            </div>
            <div className="Description">
              <div className="Label">About</div>
              <div className="Value">{each.description}</div>
            </div>
            {(() => {
              if (status == "Created" || status == "HaveApplicant") {
                return (
                  <div className="edit">
                    <Edit event={each} />
                  </div>
                );
              }
            })()}

            {/* <button onClick={() => doDelete(event.eventId)} > Cancel </button> */}
          </div>
          <div className="AppliedMusician col-5">
            {/* <Applicants eventId={each.eventId} /> */}
            {(() => {
              if (status == "Created") {
                return <div className="NoApllicant">You have no applicant</div>;
              }
              if (status == "HaveApplicant") {
                return <Applicants eventId={each.eventId} />;
              }
            })()}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyEventInfo;
