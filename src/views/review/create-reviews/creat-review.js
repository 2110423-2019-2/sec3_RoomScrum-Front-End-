import React, { useRef, useState, useReducer } from "react";
// import "./create-event.scss";
import { Navbar, Form } from "src/components/common";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import request from "superagent";
import config from "src/config";
import Modal from "react-modal";
import { ConfirmDialog } from "src/components/common";

import { formReview } from "./form-def";

const customStyles = {
    content : {
        // top                   : '50%',
        // left                  : '50%',
        // right                 : 'auto',
        // bottom                : 'auto',
      marginRight           : 'auto',
      marginLeft            : 'auto',
      marginTop             : 'auto',
      marginBottom          : 'auto',
    //   transform             : 'translate(-50%, -50%)',
      width           : '60%',
      height          : '40%'
    }
  };

const CreateReview = () => {
    const formReviewData = useRef();
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

    const postData = () => {
        const data = {};
        for (let key in formReviewData.current) {
            data[key] = formReviewData.current[key].value;
        }
        request
        .post(`${config.API_URL}/events`)
        .withCredentials()
        .send(data)
        .catch(err => console.log(err));
    };
    
    return (
        // style from admin
        <div >
        <button onClick = {openModal} className='float-right'>
          Archieve
        </button>

        <Modal  
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={customStyles}
        >
          <div  >
                <div  >
                    <h1> Review </h1>
                    <Form formDef={formReview} ref={formReviewData} />
                    <Modal className="center-popup" isOpen={showAlert}>
                        <ConfirmDialog
                            title="Confirm?"
                            question="Do you want to create review"
                            callback={confirm => {
                                setAlert(false);
                                if (confirm) {
                    // callbackAction.current();
                                    postData();
                                }
                            }}/>
                    </Modal>
                    <button
                        className="btn btn-primary mt-4"
                            onClick={() => {
                                setAlert(true);
                            }}>
                        {" "}
                        Submit{" "}
                    </button>
                </div>
          </div>
         
               
        </Modal>
      </div> 
      );
}

export default CreateReview;
