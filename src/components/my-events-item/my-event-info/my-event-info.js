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
import MyMusician from "./my-musician";
import { ViewEventInfoButton } from "src/components/action-buttons/view-event-info-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  HirerEventStatusIndicator,
  ContractStatusIndicator,
} from "src/components/event-item/status-indicator/status-indicator";
import moment from "moment";

const TimeDisplay = ({ start, end }) => {
  return (
    <div className="value">
      {moment(start).format("h:mm DD/MM/YYYY")} -{" "}
      {moment(end).format("h:mm DD/MM/YYYY")}
    </div>
  );
};

const MyEventInfo = ({ each, status, application }) => {
  if (application.contract) {
    console.log(application.contract.status);
  }

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
    budget,
    eventImage,
    userId,
  } = each;

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
    console.log("openModal");
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
          {/* <ViewEventInfoButton application={application} /> */}
          {/* <div className="EventInfo col-6">
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
          </div> */}

          <div className="EventInfo">
            <div className="Title"> {each.eventName}</div>
            <div >
              <Image className="EventInfoImage" src={[config.API_URL + `/events/${each.eventId}/pic`]} />
            </div>

            <div className="Description">
              <div className="Label"> Address </div>
              <div className="Value">
                {" "}
                {address +
                  ", " +
                  subdistrict +
                  ", " +
                  district +
                  ", " +
                  province +
                  ", " +
                  zipcode}
              </div>
            </div>
            <div className="Description">
              <div className="Label"> Time </div>
              <TimeDisplay start={startdatetime} end={enddatetime} />
            </div>
            <div className="Description">
              <div className="Label"> Budget </div>
              <div className="Value"> {budget || "<<budget>>"} baht </div>
            </div>
            <div className="Description">
              <div className="Label"> About </div>
              <div className="Value"> {description}</div>
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
          </div>


          <div className="AppliedMusician darknavy-bg ">
            {(() => {
              if (status == "Created") {
                return <div className="NoApllicant">You have no applicant</div>;
              }
              if (
                status == "HaveApplicant" ||
                (application.contract &&
                  application.contract.status == "Cancelled")
              ) {
                return (
                  <div>
                    <Applicants eventId={each.eventId} />
                  </div>
                );
              }
              if (status == "ContractDrafting") {
                return (
                  <div className="ShowMusician">You have accepted musician</div>
                );
              }
            })()}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyEventInfo;
