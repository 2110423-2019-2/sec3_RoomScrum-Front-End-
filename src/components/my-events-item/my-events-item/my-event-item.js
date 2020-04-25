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
import MyEventInfo from 'src/components/my-events-item/my-event-info';
import CreateReview from 'src/views/review/create-reviews';
//oil-ออยแอบเพิ่ม-start
import { HirerContract } from 'src/components/contract';
//oil-ออยแอบเพิ่ม-end
import { Button } from 'src/components/common';
import Image from 'react-image';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Dialog from 'src/components/common/dialog';
import ConfirmDialog from 'src/views/admin/user-report/confirm-dialog';
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


const MusicianInvitation = () => {
  
  const [musicianChoice, setMusicianChoice] = useState([]);
  const [isLoading, setLoading] = useState(false);
  
  const [openInvitationDialog, setOpenInvitationDialog] = useState(false);
  const [selectedMusician, setSelectedMusician] = useState(null);
  

  
  const fetchChoice = (query) => {
      setLoading(true);
      request.post(config.API_URL + '/user/find-by-username') // to change
      .withCredentials()
      .send({username: query})
      .then(res => {
          const musicians = JSON.parse(res.text);
          setMusicianChoice(musicians);
          setLoading(false);
      })
      .catch(err => {
          console.error("error fetching musician selection", err)
      });
  }

  const handleSelection = (selection) => {
      if (!selection || selection.length == 0) return;
      const [{username}] = selection;
      setSelectedMusician(username);
      setOpenInvitationDialog(true);
  }

  const handleInvite = (confirm) => {
      setOpenInvitationDialog(false);
      if (!confirm) return;
      if (selectedMusician) {
          request.post(config.API_URL + '/admin/user/ban') // to change
          .send({username: selectedMusician, banDuration: 7}) // to change
          .then(res => {
              setOpenInvitationDialog(false);
              alert("Invite musician success");
          })
          .catch(err => {
              alert("Invite musician error");
              console.error("Invite musician error", err);
          });
      }
  }

  return (
    <div className="invitation-musician-page">
        <Dialog isOpen={openInvitationDialog} onClose={() => setOpenInvitationDialog(false)}>
            <ConfirmDialog
                callback={handleInvite}
                question={`Are you sure you want to invite @${selectedMusician}\
                ? this cannot be undone!`}
                title="Invite Musician to this event"
            />
        </Dialog>
        <div className="container p-0">
            <div className="centered header">
                <div className="label"> Enter username to invite</div>
                <AsyncTypeahead
                    options={musicianChoice}
                    isLoading={isLoading}
                    id="async-example"
                    labelKey="username"
                    multiple={false}
                    minLength={3}
                    onSearch={fetchChoice}
                    placeholder="enter username to invite"
                    onChange={handleSelection}
                    renderMenuItemChildren={(option, props) => {
                        const {firstName, lastName, username} = option;
                        return <div> {`${firstName} ${lastName} (@${username})`}</div>;
                    }}
                />
            </div>
        </div>
    </div>
  )


}

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
    <div className='MyEventItem clearfix'>
        <div className = 'EventImageContainer'>
            <Image className='EventImage' src={[
                config.API_URL + `/events/${eventId}/pic`]}  />
        </div>
        <div className='EventInfoContainer'>
          <div className='EventName'>
            <MyEventInfo each={each} />
          </div>
          <div className='Describtion'>
            <div className = 'Label'>
                District
            </div>
            <div className = 'Value'>
                {district}
            </div>
          </div>
          <div className='Describtion'>
            <div className = 'Label'>
                Province
            </div>
            <div className = 'Value'>
                {province}
            </div>
          </div>
          <div className='HirerAction' >
            <Button type='danger' name='Cancel' onClick={() => onClick(eventId)}> Cancel </Button>
            <HirerContract eventId={eventId} />
            <CreateReview eventId={eventId} />
            <Button type='danger' name='Invite' onClick={MusicianInvitation}> Invite </Button>
          </div> 
        </div>   
        <div className='PriceTag'>
          <div className='Price'> price ????'</div>
          <div className='Currency'> baht </div>
        </div>
    </div>
  );
};

export default MyEventItem;
