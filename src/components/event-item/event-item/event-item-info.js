import React, { useState } from "react";
import Modal from "react-modal";
import "./event-item-info.scss";
import request from "superagent";
import config from "src/config";
import Image from "react-image";

const EventItemInfo = ({ description,eventId }) => {
  const formdata = {
    eventId: eventId,
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
      <button
        type="button"
        class="btn btn-primary float-right"
        onClick={handleApply}
      >
        Apply
      </button>
    </div>
  );
};

export default EventItemInfo;
