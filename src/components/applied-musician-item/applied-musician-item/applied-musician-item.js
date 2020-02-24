import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './applied-musician-item.scss'
import Button from 'react-bootstrap/Button';
import request from 'superagent';
import config from 'src/config';



const AppliedMusicianItem = ({
  each: {
    hireeName,
    hireeUsername,
    eventId,
    timestamp,
    status,
  }
  }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    

const formdata = {
  hireeName : 'John Doe' ,
  hireeId: 10,
  eventId: 1,
  timestamp: new Date().toISOString(),
  status: 2
};

const handleAccept = () => {
  request
    .post(`${config.API_URL}/application/apply`)
    .send(formdata)
    .then(res => {
      console.log(res.text);
    })
    .catch(err => {
      alert('err' + err);
    });
};
  
  return (
    <div className='card event-item' style={{ width: 1000 }}>
      <img
        className='card-img-top'
        src='https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg&w=767'
        alt='Card image cap'
      />
      <div className='card-body'>
        <h5 className='card-title'>{hireeName} </h5>
        <p className='card-text'>
          {hireeUsername}
        </p>
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
        <Button variant='secondary' onClick={handleClose}>
            Reject
        </Button>
        <Button variant='primary' onClick={handleAccept}>
            Accept
        </Button>
      </div>
    </div>
  );
};

export default AppliedMusicianItem;