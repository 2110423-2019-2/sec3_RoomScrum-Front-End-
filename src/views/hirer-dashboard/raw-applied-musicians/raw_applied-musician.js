import React, { useState } from 'react';
import { Navbar } from 'src/components/common';
import { AppliedMusicianItem } from 'src/components/applied-musicians-item';
import request from 'superagent';
import config from 'src/config';
// import {Modal} from 'react-bootstrap';
import Modal from "react-modal";

const Applicants = ({eventId}) => {
    const [show, setShow] = useState(false);
    const [isFetch, setIsFetch] = useState(false);
    const [applicantsList, setApplicantsList] = useState([]);
    // const handleShow = () => setShow(true);
    // const handleClose = () => setShow(false);
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
      }
    };


    if (!isFetch) {
        request
          .get(`${config.API_URL}/application/event/${eventId}`)
          .withCredentials()
          .then(res => {
            setIsFetch(true);
            setApplicantsList(res.body);
            console.log(res.body);
          })
          
          .catch(err => {
            alert(err);
          });
    }

    const appliedMusicianItem = applicantsList.map(each => {
        return (
          <div>
            <AppliedMusicianItem each={each} />
          </div>
        );
    });

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
      setIsOpen(true);
      console.log('openModal')
    };
    const afterOpenModal = () => {};
    const closeModal = () => {
      setIsOpen(false);
    };

 
    return (
      <div>
        <button variant='primary' onClick={openModal}>
          Applicants
        </button>
  
        <Modal  
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
        >
         
 
              <div>
                {appliedMusicianItem};
              </div>                

          
        </Modal>
      </div>
    );
};


export default Applicants;