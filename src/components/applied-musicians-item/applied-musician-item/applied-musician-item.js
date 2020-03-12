import React, { useState } from 'react';
import Modal from "react-modal";
import './applied-musician-item.scss'
import request from 'superagent';
import config from 'src/config';
import { ConfirmDialog } from "src/components/common";


const AppliedMusicianItem = ({
  each: {
    eventId,
    hireeId,
    timestamp,
    status
  }
  }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [showAlert, setAlert] = useState(false);
    

const formdata = {
  //hireeName : {hireeName} ,
  hireeId: hireeId,
  eventId: eventId,
  //timestamp: new Date().toISOString(),
  //status: {status}
};

const handleAccept = () => {
  request
    .post(`${config.API_URL}/application/accept`)
    .send(formdata)
    .withCredentials()
    .then(res => {
      console.log(res.text);
    })
    .catch(err => {
      alert('err' + err);
    });
};
  
  return (
    <div className='card event-item' style={{ width: 300 }}>
      <img
        className='card-img-top'
        src='https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg&w=767'
        alt='Card image cap'
      />
      <div className='card-body'>

        <p className='card-text'>
          {eventId}
        </p>
        <p className='card-text'>
          {timestamp}
        </p>
        {/* <MoreDetailModal
          eventId={eventId}
          description={description}
          startdatetime={startdatetime}
          enddatetime={enddatetime}
        /> */}
        <button variant='secondary' onClick={handleClose}>
            Reject
        </button>
        <Modal className="center-popup" isOpen={showAlert}>
                <ConfirmDialog
                  title="Confirm?"
                  question="Do you want to accept this musician?"
                  callback={confirm => {
                    setAlert(false);
                    if (confirm) {
                      // callbackAction.current();
                      handleAccept();
                      handleClose();
                    }
                  }}
                />
              </Modal>
    
              <button
                variant='secondary'
                onClick={() => {
                  setAlert(true);
                }}
              >
                {" "}
                Accept{" "}
              </button>
      </div>
      
    </div>
  );
};

export default AppliedMusicianItem;