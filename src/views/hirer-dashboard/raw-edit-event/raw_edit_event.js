import React, { useRef, useState, useReducer } from "react";
import "./raw_edit_event.scss";
import { Navbar, Form } from "src/components/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import request from "superagent";
import config from "src/config";
import Modal from "react-modal";
import { ConfirmDialog } from "src/components/common";
import { formStateBuilder } from "src/components/common/form/form-state";
import FormV2 from "src/components/common/form/form-v2";
import { formBelow, formUpper } from "./form-definition";
import { setForm } from "src/components/common/form/fields";
import moment from "moment";

const Edit = ({ event }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => setShow(false);

  const [showAlert, setAlert] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
      setIsOpen(true);
      console.log('openModal')
    };
    const afterOpenModal = () => {};
    const closeModal = () => {
      setIsOpen(false);
    };

  let { startdatetime, enddatetime } = event;

  event.startDate = startdatetime.substr(0, 10);
  event.startTime = startdatetime.substr(11, 8);
  event.endDate = enddatetime.substr(0, 10);
  event.endTime = enddatetime.substr(11, 8);

  // startdatetime = moment(startdatetime);
  // enddatetime = moment(startdatetime);
  console.log(startdatetime);
  // startDate =

  const [userFormUpper, dispatchUserFormUpper] = formStateBuilder(
    formUpper,
    event
  )();
  const [userFormBelow, dispatchUserFormBelow] = formStateBuilder(
    formBelow,
    event
  )();

  const save = async () => {
    const sendData = {};
    for (let key in formUpper) sendData[key] = formUpper[key].value;
    sendData["startdatetime"] =
      formUpper["startDate"].value +
      "T" +
      formUpper["startTime"].value +
      ":00.000Z";
    sendData["enddatetime"] =
      formUpper["endDate"].value +
      "T" +
      formUpper["endTime"].value +
      ":00.000Z";
  
    for (let key in formBelow) sendData[key] = formBelow[key].value;
        await request.post(`${config.API_URL}/events/update/${event.eventId}`)
                      .withCredentials()
                      .send(sendData)
            //   .then(() => {
            //     alert("Event Updated")
            //     // changeCallback();
            //     // handleClose();
            // })
            .then(() => {
              alert("Event Updated")
              // changeCallback();
              handleClose();
          })
          .catch(err => {
              alert("update Event error");
              console.error("Error updating event", err);
          })

  }

  return (
    <div>
      <button classname='button' variant="primary" onClick={openModal}>
        Edit
      </button>

      <Modal 
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Modal">
        <FormV2
          formData={userFormUpper}
          dispatch={dispatchUserFormUpper}
          formDef={formUpper}
        />
        <FormV2
          formData={userFormBelow}
          dispatch={dispatchUserFormBelow}
          formDef={formBelow}
        />
        <Modal className="center-popup" isOpen={showAlert}>
          
          <ConfirmDialog
            title="Confirm?"
            question="Do you want to Edit event"
            callback={confirm => {
              setAlert(false);
              if (confirm) {
                // callbackAction.current();
                save();
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
      </Modal>
    </div>
  );
};

export default Edit;
