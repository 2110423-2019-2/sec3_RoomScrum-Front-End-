import React, { useState } from "react";
import Modal from "react-modal";
import "./event-item-info.scss";
import request from "superagent";
import config from "src/config";
import Image from "react-image";
import Dialog from "src/components/common/dialog";
import ConfirmDialog from "src/views/admin/user-report/confirm-dialog";
import { RoleGuard } from "src/components/common/guard";
import { ShowProfileButton } from "src/components/profile";

const EventItemInfo = ({ each }) => {
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
    user,
  } = each;

  const formdata = {
    eventId: eventId,
  };

  const firstName = user.firstName;
  const lastName = user.lastName;

  const [showAlert, setAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
    console.log("openModal");
  };

  const handleApply = () => {
    request
      .post(`${config.API_URL}/application/apply`)
      .withCredentials()
      .send(formdata)
      .then((res) => {
        console.log(res.text);
        window.location.href = "/musician/my-events";
      })
      .catch((err) => {
        alert("err" + err);
      });
  };

  return (
    <div className="EventInfoContainer">
      <Image
        className="EventInfoImage"
        src={[
          config.API_URL + `/events/${eventId}/pic`,
          "https://i.pravatar.cc/180",
        ]}
      />
      <div className="EventInfoLabel">Time</div>
      <div className="EventInfoValue">
        {startdatetime.substr(11, 8)} {startdatetime.substr(0, 10)} to{" "}
        {enddatetime.substr(11, 8)} {enddatetime.substr(0, 10)}
      </div>
      <div className="EventInfoLabel">Location</div>
      <div className="EventInfoValue">
        {address} {subdistrict} {district} {province} {country}
      </div>
      <div className="EventInfoLabel">Description</div>
      <div className="EventInfoValue">{description}</div>
      <div className="EventInfoLabel">Hirer</div>
      <ShowProfileButton user={user}>
        <div className="EventInfoValue">
          {firstName} {lastName}{" "}
          <div className="ClickHereInvitation">
            (click here to see his/her profile)
          </div>
        </div>
      </ShowProfileButton>

      {/* <p>{description}</p>
            <p>{startdatetime}</p>
            <p>{enddatetime}</p> */}
      <Modal className="center-popup" isOpen={showAlert}>
        <ConfirmDialog
          title="Confirm?"
          question="Do you want to apply this event"
          callback={(confirm) => {
            setAlert(false);
            if (confirm) {
              // callbackAction.current();
              handleApply();
            }
          }}
        />
      </Modal>
      <RoleGuard role="Musician">
        <button
          className="ApplyButton btn-primary float-right"
          onClick={() => {
            setAlert(true);
          }}
        >
          {" "}
          Apply{" "}
        </button>
      </RoleGuard>
    </div>
  );
};

export default EventItemInfo;
