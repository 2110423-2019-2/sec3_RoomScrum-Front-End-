import React, { useState } from "react";
import Modal from "react-modal";
import "./applied-musician-item.scss";
import request from "superagent";
import config from "src/config";
import { ConfirmDialog } from "src/components/common";
import Image from "react-image";
import { ShowProfileButton } from "src/components/profile";
import ReportButton from "src/components/profile/report-dialog";
import { RoleGuard } from "src/components/common/guard";

const AppliedMusicianItem = ({
  each: {
    eventId,
    hireeId,
    hiree: {
      firstName,
      lastName,
      username,
      userId,
      birthdate,
      address,
      subdistrict,
      district,
      cityState,
      zipcode,
      country,
      phoneNumber,
      userType,

      //musician
      bio,
      video,

      //sensitive
      nationalId,
      gender,
      email,
    },
  },
  onClick,
}) => {
  const hiree = {
    firstName,
    lastName,
    username,
    userId,
    birthdate,
    address,
    subdistrict,
    district,
    cityState,
    zipcode,
    country,
    phoneNumber,
    userType,

    //musician
    bio,
    video,

    //sensitive
    nationalId,
    gender,
    email,
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [showAlert, setAlert] = useState(false);

  const formdata = {
    //hireeName : {hireeName} ,
    hireeId: hireeId,
    eventId: eventId,
    //timestamp: new Date().toISOString(),
    //status: {status}
  };

  const handleAccept = () => {
    request
      .post(`${config.API_URL}/application/accept-applied-musician`)
      .send(formdata)
      .withCredentials()
      .then(() => {
        window.location.href = "/hirer/event";
      })
      .catch((err) => {
        alert("err" + err);
      });
  };

  return (
    <div className="AppliedMusicianItem clearfix">
      <div className="MusicianImageContainer">
        <Image
          className="MusicianImage"
          src={[config.API_URL + `/user/profile-pic/${hireeId}`]}
        />
      </div>
      <div className="MusicianInfo">
        <div className="Description">
          <ShowProfileButton user={hiree}>
            <div className="Label">
              {firstName} {lastName}
            </div>
          </ShowProfileButton>
        </div>
        <div className="Value">@{username}</div>
        <RoleGuard role="Musician">
          <div className="ActionContainer">
            <Modal className="center-popup" isOpen={showAlert}>
              <ConfirmDialog
                title="Confirm?"
                question="Do you want to accept this musician?"
                callback={(confirm) => {
                  setAlert(false);
                  if (confirm) {
                    // callbackAction.current();
                    handleAccept();
                    handleClose();
                  }
                }}
              />
            </Modal>
            <div
              className="Accept"
              onClick={() => {
                setAlert(true);
              }}
            >
              {" "}
              Accept{" "}
            </div>
          </div>
        </RoleGuard>
      </div>
    </div>
  );
};

export default AppliedMusicianItem;
