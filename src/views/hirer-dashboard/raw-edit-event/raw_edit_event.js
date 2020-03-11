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
import { formStateBuilder } from "src/components/common/form/form-state";
import FormV2 from "src/components/common/form/form-v2";
import { formBelow, formUpper } from "./form-definition";

const Edit = () => {
    

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [myEventList, setMyEventList] = useState([]);
    const [isFetch, setIsFetch] = useState(false);

    const [userFormUpper, dispatchUserFormUpper] = formStateBuilder(formUpper, 
                                      {eventName: myEventList.eventName, 
                                        startDate: myEventList.startDate,
                                        startTime: myEventList.startTime,
                                        endDate: myEventList.endDate,
                                        endTime: myEventList.endTime})();
    const [userFormBelow, dispatchUserFormBelow] = formStateBuilder(formBelow, 
                                        {description: myEventList.description,
                                        address: myEventList.address,                                         
                                        subdistrict: myEventList.subdistrict,
                                        district: myEventList.district,
                                        province: myEventList.province,
                                        country: myEventList.country,
                                        zipcode: myEventList.zipcode})();                            
    if (!isFetch) {
      request
        .get(`${config.API_URL}/events`)
        .then(res => {
          setIsFetch(true);
          setMyEventList(res.body);
          console.log(res.body);
        })
        .catch(err => {
          alert(err);
        });
  }

  const sendData = {};
    for (let key in userFormUpper)
      sendData[key] = userFormUpper[key].value;

    for (let key in userFormBelow)
      sendData[key] = userFormBelow[key].value;
      
    try {
        request
        .post(`${config.API_URL}/user/create`)
        .send(sendData);
        } catch (err) {
        alert("error");
      }
    
    return (
    <div>
        <Button variant='primary' onClick={handleShow}>
          Edit
        </Button>
        
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Event Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                      sendData();
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
        </Modal.Body>
        </Modal>

        </div>          
                           
      );
};

export default Edit;