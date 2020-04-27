import React, { useState } from "react";
import Modal from "react-modal";
import "./event-item-info.scss";
import request from "superagent";
import config from "src/config";
import Image from "react-image";
import Dialog from "src/components/common/dialog";
import ConfirmDialog from "src/views/admin/user-report/confirm-dialog";
import { RoleGuard } from 'src/components/common/guard';

const EventItemInfo = ({ description, eventId }) => {
  const formdata = {
    eventId: eventId,
  };

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
      <div className="EventInfoLabel">Description</div>
      <div className="EventInfoValue">{description}</div>
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
          className="ApplyButton btn-primary "
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
