import React, { useRef, useState, useReducer } from "react";
import "./create-event.scss";
import { Navbar, Form } from "src/components/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import request from "superagent";
import config from "src/config";
import Modal from "react-modal";
import { ConfirmDialog } from "src/components/common";

import { formBelow, formUpper } from "./form-definition";

const CreateEventPage = () => {
  const uploadedFile = useRef();
  const formDataUpper = useRef();
  const formDataBelow = useRef();
  const [eventImage, setEventImage] = useState(null);

  const clickUpload = () => {
    uploadedFile.current.click();
  };

  const updateEventImage = () => {
    const upload = uploadedFile.current;
    if (upload.files && upload.files[0]) {
      var reader = new FileReader();

      reader.onload = e => {
        setEventImage(e.target.result);
      };
      reader.readAsDataURL(upload.files[0]);
    }
  };

  const postData = async imageName => {
    const data = {};
    for (let key in formDataUpper.current) {
      if (
        key != "startDate" &&
        key != "startTime" &&
        key != "endDate" &&
        key != "endTime"
      )
        data[key] = formDataUpper.current[key].value;
    }
    for (let key in formDataBelow.current) {
      data[key] = formDataBelow.current[key].value;
    }
    data["eventImage"] = imageName;
    data["startdatetime"] =
      formDataUpper.current["startDate"].value +
      "T" +
      formDataUpper.current["startTime"].value +
      ":00.000Z";
    data["enddatetime"] =
      formDataUpper.current["endDate"].value +
      "T" +
      formDataUpper.current["endTime"].value +
      ":00.000Z";
    console.log(JSON.stringify(data));
    request
      .post(`${config.API_URL}/events`)
      .withCredentials()
      .send(data)
      .then(() => {
        window.location.href = "/event/info";
      })
      .catch(err => console.log(err));
  };

  const uploadImage = async () => {
    const form = new FormData();
    const upload = uploadedFile.current;
    if (!upload.files || !upload.files[0]) throw new Error("No file uploaded");
    form.append("image", uploadedFile.current.files[0]);
    return request
      .post(`${config.API_URL}/events/pic`)
      .withCredentials()
      .send(form)
      .then(res => {
        return JSON.parse(res.text);
      });
  };

  const createEvent = async () => {
    const res = await uploadImage();
    await postData(res.imageName);
  };

  const [showAlert, setAlert] = useState(false);

  return (
    // style from admin
    <div className="full-height create-event">
      <Navbar />
      <div className="rest">
        <div className="container rounded-top rounded-lg shadow">
          <h1> Create Event</h1>
          <div className="container-fluid">
            <div className="row upload-image">
              <div className="upload-image">
                {eventImage && <img src={eventImage} />}

                <input
                  name="image"
                  ref={uploadedFile}
                  onChange={updateEventImage}
                  type="file"
                  hidden
                />
                <div
                  className={classnames({
                    overlay: true,
                    "force-show": !eventImage
                  })}
                  onClick={clickUpload}
                >
                  <div>
                    <FontAwesomeIcon icon={faArrowCircleUp} />
                  </div>
                </div>
              </div>
              <div className="col">
                <Form formDef={formUpper} ref={formDataUpper} />
              </div>
            </div>
            <Form formDef={formBelow} ref={formDataBelow} />

            <Modal className="center-popup" isOpen={showAlert}>
              <ConfirmDialog
                title="Confirm?"
                question="Do you want to create event"
                callback={confirm => {
                  setAlert(false);
                  if (confirm) {
                    // callbackAction.current();
                    createEvent();
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
        </div>
      </div>
  );
};

export default CreateEventPage;
