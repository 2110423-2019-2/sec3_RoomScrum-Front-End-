import React, { useRef, useState } from "react";
import request from "superagent";
import config from "src/config";
import { observer } from "mobx-react";
import { globalLoginState } from "src/store";
import Image from "react-image";
import moment from "moment";
import Modal from "react-modal";
import "./profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Dialog from "src/components/common/dialog";
import { Form } from "src/components/common";
import { Button } from "src/components/common";
import ConfirmDialog from "src/views/admin/user-report/confirm-dialog";
// import ReportButton from 'src/components/action-buttons/report-button';

import { UserType } from "src/enums";
moment.locale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "now",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1m",
    MM: "%dm",
    y: "1y",
    yy: "%d",
  },
});

// constructor for form field
const formField = (name, value) => ({ name, value });

const ReportButton = ({ userId, username }) => {
  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const formReportData = useRef();
  const openModal = () => {
    setIsOpen(true);
    console.log("openModal");
  };
  const afterOpenModal = () => {};
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleClose = () => setIsOpen(false);
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
      height: "40%",
    },
  };
  const formReport = {
    topic: {
      type: "textarea",
      label: "",
      width: "12",
    },
    description: {
      type: "textarea",
      label: "",
      width: "12",
      // default: "write a review",
      validator: [
        (value) => {
          if (value) return false;
          return " ";
        },
      ],
    },
  };

  const postData = () => {
    const data = {};
    for (let key in formReportData.current) {
      data[key] = formReportData.current[key].value;
    }
    data["reportTo"] = username; // to change
    request
      .post(`${config.API_URL}/report`)
      .withCredentials()
      .send(data)
      .then(() => {
        // window.location.href = "/hirer/event";
        alert("Report Success");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="Report">
      <div className="ReportTitle" onClick={openModal}>
        Report
      </div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={customStyles}
      >
        <div>
          <div>
            <h1> Report </h1>
            <div className="Description">
              <div className="Label"> Report to</div>
              <div className="Value">@{username}</div>
            </div>
            <Form formDef={formReport} ref={formReportData} />
            <Modal className="center-popup" isOpen={showAlert}>
              <ConfirmDialog
                title="Confirm?"
                question="Do you want to report"
                callback={(confirm) => {
                  setAlert(false);
                  if (confirm) {
                    // callbackAction.current();
                    postData();
                    handleClose();
                  }
                }}
              />
            </Modal>
            <button
              className="btn btn-primary mt-4"
              onClick={() => {
                setAlert(true);
              }}
            >
              {" "}
              Submit{" "}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const Profile = ({
  user: {
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
  onProfileUpdate,
  isSelf,
  EditProfileDialog,
}) => {
  const formDef = [
    formField(
      "Birthdate",
      moment(birthdate).format("MMM DD, YYYY") +
        " " +
        `( ${moment(birthdate).fromNow()} years old )`
    ),
    formField("Gender", gender),
    // formField("About", bio),
    userType != "Hirer" && formField("About", bio),
    formField("National ID", nationalId),
    formField(
      "Address",
      [address, subdistrict, district, cityState, country, zipcode].join(" ")
    ),
    formField("Email", email),
    formField("Phone Number", phoneNumber),
    // (userType != "Hirer" && formField("Bio", bio))
  ];

  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <div className="profile">
      <div className="title"> {firstName + " " + lastName} </div>
      <div className="alias"> @{username} </div>
      <Image
        className="profile-image"
        src={[
          config.API_URL + `/user/profile-pic/${userId}`,
          "https://i.pravatar.cc/180",
        ]}
      />
      {formDef.map(({ name, value }) => {
        console.log({ name, value });
        return (
          <div className="desc">
            <div className="label"> {name}</div>
            <div className="value"> {value}</div>
          </div>
        );
      })}
      {isSelf && (
        <>
          <button
            className="edit-profile-button"
            onClick={() => setShowEditDialog(true)}
          >
            <FontAwesomeIcon icon={faEdit} />
            Edit my profile
          </button>
          <Dialog
            isOpen={showEditDialog}
            onClose={() => setShowEditDialog(false)}
          >
            <EditProfileDialog
              userId={userId}
              onClose={() => setShowEditDialog(false)}
              changeCallback={onProfileUpdate}
            />
          </Dialog>
        </>
      )}
      {!isSelf && <ReportButton />}
    </div>
  );
};

export default Profile;
