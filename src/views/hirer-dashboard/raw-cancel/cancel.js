import React, { useState } from 'react';
import { Navbar } from 'src/components/common';
import { AppliedMusicianItem } from 'src/components/applied-musician-item';
import request from 'superagent';
import config from 'src/config';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Cancel = () => {
    const [show, setShow] = useState(false);
    const [isFetch, setIsFetch] = useState(false);
    const [applicantsList, setApplicantsList] = useState([]);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleCancel = () => {
        request
          .post(`${config.API_URL}/application/apply`)
          .send(formdata)
          .then(res => {
            console.log(res.text);
          })
          .catch(err => {
            alert("err" + err);
          });
        setShow(false);
        delete this;
      };

    return (
        <div>
          <Button variant='primary' onClick={handleCancel}>
            Cancel
          </Button>
    
        
        </div>
      );
  };