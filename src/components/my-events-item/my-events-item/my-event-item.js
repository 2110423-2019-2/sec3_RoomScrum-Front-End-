import React, { useState , useRef } from 'react';
import Modal from 'react-modal';
import './my-event-item.scss';
import request from 'superagent';
import config from 'src/config';
import Applicants from 'src/views/hirer-dashboard/raw-applied-musicians';
import Edit from 'src/views/hirer-dashboard/raw-edit-event';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Form } from 'src/components/common';
import MyEventInfo from 'src/components/my-events-item/my-event-info';
// import CreateReview from 'src/views/review/create-reviews';
//oil-ออยแอบเพิ่ม-start
import { HirerContract } from 'src/components/contract';
//oil-ออยแอบเพิ่ม-end
import { Button } from 'src/components/common';
import Image from 'react-image';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Dialog from 'src/components/common/dialog';
import ConfirmDialog from 'src/views/admin/user-report/confirm-dialog';
// import { ConfirmDialog } from "src/components/common";

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


const MusicianInvitation = ({eventId}) => {
  
  const [musicianChoice, setMusicianChoice] = useState([]);
  const [isLoading, setLoading] = useState(false);
  
  const [openInvitationDialog, setOpenInvitationDialog] = useState(false);
  const [selectedMusician, setSelectedMusician] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    console.log('openModal')
  };
  const afterOpenModal = () => {};
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleClose = () => setIsOpen(false);
  
  

  
  const fetchChoice = (query) => {
      setLoading(true);
      request.post(config.API_URL + '/user/find-by-username') // to change
      .withCredentials()
      .send({username: query})
      .then(res => {
          const musicians = JSON.parse(res.text);
          console.log(musicians);
          setMusicianChoice(musicians);
          setLoading(false);
      })
      .catch(err => {
          console.error("error fetching musician selection", err)
      });
  }

  const handleSelection = (selection) => {
      if (!selection || selection.length == 0) return;
      const [{userId}] = selection;
      setSelectedMusician(userId);
      setOpenInvitationDialog(true);
  }

  const handleInvite = (confirm) => {
      setOpenInvitationDialog(false);
      if (!confirm) return;
      if (selectedMusician) {
          request.post(config.API_URL + '/application/invite-musician') // to change
          .withCredentials()
          .send({hireeId: selectedMusician, eventId}) // to change
          .then(res => {
              setOpenInvitationDialog(false);
              handleClose();
              alert("Invite musician success");
          })
          .catch(err => {
              alert("Invite musician error");
              console.error("Invite musician error", err);
          });
      }
  }

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
    width           : '40%',
    height          : '20%'
    }
  };



  return (
    <div className="invitation-musician-page">
      <div className='InviteButton'>
          <button onClick={openModal}>
              Invite
          </button>
      </div>

      <Modal  
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      contentLabel="Modal"
      style={customStyles}
      >
        <Dialog isOpen={openInvitationDialog} onClose={() => setOpenInvitationDialog(false)}>
            <ConfirmDialog
                callback={handleInvite}
                question={`Are you sure you want to invite him/her \
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
      </Modal>
    </div>
  )


}

const CreateReview = ({eventId }) => {
  const formReviewData = useRef();
  const [show, setShow] = useState(false);
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
  const handleClose = () => setIsOpen(false);
  
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

  const postData = () => {
      const data = {};
      for (let key in formReviewData.current) {
          data[key] = formReviewData.current[key].value;
      }
      data["eventId"] = eventId;
      request
      .post(`${config.API_URL}/review`)
      .withCredentials()
      .send(data)
      .then(() => {
        window.location.href = "/hirer/event";
      })
      .catch(err => console.log(err));
      alert('foo')
  };

  const formReview = {
    description: {
        type: "textarea",
        label: "",
        width: "12",
        // default: "write a review",
        validator: [
          value => {
            if (value) return false;
            return " ";
          }
        ]
      }
  };
  
  return (
      // style from admin
      <div classname = 'review'>
        <div className='archieve-button'>

          <button onClick={openModal}>
              Archieve
          </button>

        </div>
     

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
                                  handleClose();
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
          <div className=' row HirerAction' >
            <Button type='danger' name='Cancel' onClick={() => onClick(eventId)}> Cancel </Button>         
            <HirerContract eventId={eventId} />          
            <CreateReview eventId={eventId}  />
            <MusicianInvitation eventId={eventId} />

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
