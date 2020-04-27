import React, { useRef, useState } from "react";
import request from "superagent";
import config from "src/config";
import { observer } from "mobx-react";
import { globalLoginState } from "src/store";
import Image from "react-image";
import moment from "moment";
import Modal from "react-modal";
import "./report-dialog.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Dialog from "src/components/common/dialog";
import { Form } from "src/components/common";
import { Button } from "src/components/common";
import ConfirmDialog from "src/views/admin/user-report/confirm-dialog";


const ReportButtonnn = ({username }) => {
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
      label: "Topic",
      width: "sm-6",

    },
    description: {
      type: "textarea",
      label: "Description",
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
    <div >
      <div className="ReportTitle" onClick={() => openModal()}>
        Report
      </div>
      {/* <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // contentLabel="Modal"
        style={customStyles}
        className='report-modal'
      > */}
      <Dialog  className="center-popup" style={{"z-index":11}} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="Container">
          <div>
            <div className="Title"> Report </div>
            <div className="Description">
              <div className="Label"> Report to</div>
              <div className="Value">@{username}</div>
            </div>
            <Form formDef={formReport} ref={formReportData} />
            <Modal className="center-popup"  isOpen={showAlert}>
              <ConfirmDialog
                style={{"z-index":1111}}
                title="Confirm?"
                question="Do you want to report"
                callback={(confirm) => {
                  setAlert(false);
                  if (confirm) {
                    // callbackAction.current();
                    postData();
                    closeModal();
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
      </Dialog>
    </div>
  );
};

export default ReportButtonnn;