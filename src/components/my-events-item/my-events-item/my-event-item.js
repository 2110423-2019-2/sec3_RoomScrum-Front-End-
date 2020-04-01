import React, { useState } from 'react';
import Modal from 'react-modal';
import './my-event-item.scss';
import request from 'superagent';
import config from 'src/config';
import Applicants from 'src/views/hirer-dashboard/raw-applied-musicians';
import Edit from 'src/views/hirer-dashboard/raw-edit-event';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from 'src/components/common';
import MyEventInfo from 'src/components/my-events-item/my-event-info'
import CreateReview from 'src/views/review/create-reviews';
// const EventInfoModal = ({
//   eventName,
//   description,
//   address,
//   subdistrict,
//   district,
//   province,
//   country,
//   zipcode,
//   startdatetime,
//   enddatetime,
//   status
// }) => {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);

//   const handleShow = () => setShow(true);

//   return (
//     <div>
//       <Modal show={handleShow} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Event Info</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>{eventName}</p>
//           <p>{description}</p>
//           <p>{address}</p>
//           <p>{subdistrict}</p>
//           <p>{district}</p>
//           <p>{province}</p>
//           <p>{country}</p>
//           <p>{zipcode}</p>
//           <p>{startdatetime}</p>
//           <p>{enddatetime}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <button variant='secondary' onClick={handleClose}>
//             Close
//           </button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };






// const ContractModal = ({ eventId }) => {
//   // alert(eventId);
//   console.log(eventId);
//   var description = '';
//   var price = 0;
//   const [isOpen, setIsOpen] = useState(false);
//   const openModal = () => {
//     setIsOpen(true);
//   };
//   const afterOpenModal = () => {};
//   const closeModal = () => {
//     setIsOpen(false);
//   };
//   const handleViewContract = () => {
//     // alert('handleViewContract');
//     console.log(eventId);
//     request
//       .get(`${config.API_URL}/contract/${eventId}`)
//       .withCredentials()
//       .then(res => {
//         console.log(res.text);
//         alert('complete ?');
//       })
//       .catch(err => {
//         alert('err' + err);
//       });
//     setIsOpen(false);
//   };

//   return (
//     <div>
//       <button onClick={handleViewContract}>view contract</button>
//       <Modal
//         isOpen={isOpen}
//         onAfterOpen={afterOpenModal}
//         onRequestClose={closeModal}
//         contentLabel='Modal'>
//         <div>
//           <p>{description}</p>
//           <p>{price}</p>
//           <button
//             type='button'
//             class='btn btn-primary float-right'
//             onClick={handleViewContract}>
//             view contract
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const ContractModal = ({ eventId, status }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState();
  const [price, setPrice] = useState(0);
  const openModal = () => {
    getContractDetail();
    setIsOpen(true);
  };
  const afterOpenModal = () => {};
  const closeModal = () => {
    setIsOpen(false);
  };
  // const formdata = {
  //   eventId: eventId,
  //   timestamp: new Date().toISOString()
  // };

  const getContractDetail = () => {
    request
      .get(`${config.API_URL}/contract/${eventId}`)
      .withCredentials()
      .then(res => {
        // console.log(res.text);
        // console.log(res.body.eventId);
        setDescription(res.body.description);
        setPrice(res.body.price);
      })
      .catch(err => {
        alert('err' + err);
      });
    setIsOpen(false);
  };
  const Accept = () => {
    if (status == 'SENT') {
      alert('accept complete');
      //accept: POST http://localhost:3002/contract/accept/:id (if)
      request
        .post(`${config.API_URL}/contract/accept/${eventId}`)
        .withCredentials()
        .send()
        .then(res => {
          console.log('accept complete');
          console.log(res.text);
        })
        .catch(err => {
          alert('err' + err);
        });
    } else {
      alert('Accept or Reject are not available now');
    }
    setIsOpen(false);
  };

  const Reject = () => {
    if (status == 'SENT') {
      alert('reject complete');
      request
        .post(`${config.API_URL}/contract/reject/${eventId}`)
        .withCredentials()
        .send()
        .then(res => {
          console.log('reject complete');
          console.log(res.text);
        })
        .catch(err => {
          alert('err' + err);
        });
    } else {
      alert('Accept or Reject are not available now');
    }
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>View contract</button>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Modal'>
        <div>
          <p>price : {price}</p>
          <p>description : {description}</p>

          <button
            type='button'
            class='btn btn-primary float-right'
            onClick={Accept}
            style={{ marginLeft: '22px' }}>
            Accept
          </button>
          <button
            type='button'
            class='btn btn-danger float-right'
            onClick={Reject}>
            Reject
          </button>
        </div>
      </Modal>
    </div>
  );
};

const MyEventItem = ({ each, onClick }) => {
  const showContract = () => {
    alert(eventId);
  };
  const {
    eventId,
    eventName,
    status,
    // hirerId,
    description,
    address,
    subdistrict,
    district,
    province,
    country,
    zipcode,
    startdatetime,
    enddatetime,
    isCancelled,
    eventImage,
    userId
  } = each;
  return (
    <div  className='my-event-item' >
      <img className='responsive' src={eventImage} alt='Card image cap' />
      <div >
        <MyEventInfo event = {each}  />
        <div>
          <p1 className='card-body'> {district} </p1>
        </div>
        <div>
          <p1 className='card-body'> {province} </p1>
        </div>
        <div className='row'>
        <button onClick={() => onClick(eventId)}> Cancel </button>
         {/* <EventInfoModal
          eventName={eventName}
          description={description}
          address={address}
          subdistrict={subdistrict}
          district={district}
          province={province}
          country={country}
          zipcode={zipcode}
          startdatetime={startdatetime}
          enddatetime={enddatetime}
          status={status}
        /> */}
     </div>
     {/* <Switch>
      <Route exact path="/hirer/event/eventinfo">
        <MyEventInfo event = {each} />
      </Route>
    </Switch>   */}

      <div className='float-right margin-right-2'>
        {/* <Edit event={each} />
        <Applicants eventId={eventId} />
        <button variant='secondary' onClick={() => onClick(eventId)}>
          Cancel
        </button>
        <ContractModal eventId={eventId} status={status} /> */}
        <CreateReview eventId = {eventId}/>
      </div>
        </div>
        
    </div>
  );
};

export default MyEventItem;
