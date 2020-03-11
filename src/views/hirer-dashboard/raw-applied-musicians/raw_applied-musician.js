import React, { useState } from 'react';
import { Navbar } from 'src/components/common';
import { AppliedMusicianItem } from 'src/components/applied-musician-item';
import request from 'superagent';
import config from 'src/config';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const Applicants = () => {
    const [show, setShow] = useState(false);
    const [isFetch, setIsFetch] = useState(false);
    const [applicantsList, setApplicantsList] = useState([]);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    if (!isFetch) {
        request
          .get(`${config.API_URL}/events`)
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
    
 
    return (
      <div>
        <Button variant='primary' onClick={handleShow}>
          Applicants
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Applicants</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                {appliedMusicianItem};
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant='primary' onClick={handleApply}>
              Apply
            </Button> */}
          </Modal.Footer>
        </Modal>
      </div>
    );
};


export default Applicants;