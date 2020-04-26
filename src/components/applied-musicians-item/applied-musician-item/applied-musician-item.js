import React, { useState } from "react";
import Modal from "react-modal";
import "./applied-musician-item.scss";
import request from "superagent";
import config from "src/config";
import { ConfirmDialog } from "src/components/common";
import Image from "react-image";

const AppliedMusicianItem = ({
  each: {
    eventId,
    hireeId,
    hiree: { firstName, lastName, username },
  }, onClick
}) => {
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
      .post(`${config.API_URL}/application/accept`)
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
    <div className="AppliedMusicianItem">
      <div className="MusicianImageContainer">
        <Image
          className="MusicianImage"
          src={[config.API_URL + `/user/profile-pic/${hireeId}`]}
        />
      </div>
      <div className="MusicianInfo">
        <div className="Description">
          <div className="Label">
            {firstName} {lastName}
          </div>
          <div className="Value">@{username}</div>
        </div>
        <div className='ActionContainer'>
          <div onClick={() => onClick(hireeId)} className="Reject">
            Reject
          </div>
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
      </div>
    </div>
  );
};

export default AppliedMusicianItem;
