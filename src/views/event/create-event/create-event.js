import React, { useRef, useState, useReducer } from 'react';
import './create-event.scss';
import { Navbar, Form } from 'src/components/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import request from 'superagent';
import config from 'src/config';
import Modal from 'react-modal';
import { ConfirmDialog } from 'src/components/common';
import { formBelow, formUpper } from './form-definition';
import FormV2 from 'src/components/common/form/form-v2';
import { formStateBuilder } from 'src/components/common/form/form-state';
import ImageUploader from 'src/components/common/image-upload/image-upload';
import { UserType } from 'src/enums';

// const CreateEvent = () => {
//   const [eventFormBelow, dispatchEventFormBelow] = formStateBuilder(
//     formBelow
//   )();
//   const [eventFormUpper, dispatchEventFormUpper] = formStateBuilder(
//     formUpper
//   )();
//   const [eventImage, setEventImage] = useState(null);
//   const [accepted, setAccepted] = useState(false);

//   const submit = async () => {
//     dispatchEventFormUooer({ type: "PRE_SUBMIT" });
//     dispatchEventFormBelow({ type: "PRE_SUBMIT" });
//     let hasError = false;
//     for (let key in eventFormBelow) {
//       console.log(eventFormBelow[key]);
//       if (eventFormBelow[key].errors && eventFormBelow[key].errors.length > 0) {
//         hasError = true;
//         break;
//       }
//     }
//     for (let key in eventFormUpper) {
//       console.log(eventFormUpper[key]);
//       if (eventFormUpper[key].errors && eventFormUpper[key].errors.length > 0) {
//         hasError = true;
//         break;
//       }
//     }
//     if (hasError) {
//       alert("Please enter all details");
//       return;
//     }
//     const eventImageName = await request
//       .post(`${config.API_URL}/user/temp-profile-pic`) // to change
//       .attach("image", eventImage)
//       .then((res) => {
//         const { imageName } = JSON.parse(res.text);
//         return imageName;
//       })
//       .catch((err) => {
//         alert("profile upload err");
//         console.log(err);
//         return null;
//       });
//     if (!profileImageName) return;

//     alert("upload files success");

//     const sendData = {};
//     for (let key in eventFormUpper)
//       if (!formUpper[key].ignore) sendData[key] = eventFormUpper[key].value;
//     for (let key in eventFormBelow)
//       if (!formBelow[key].ignore) sendData[key] = eventFormBelow[key].value;

//     for (let key in musicianForm)
//       if (!musicianFormDef[key].ignore) sendData[key] = musicianForm[key].value;

//     Object.assign(sendData, {
//       eventImage: eventImageName,
//     });

//     try {
//       await request
//         .post(`${config.API_URL}/user/create`) //to change
//         .send(sendData)
//         .then((res) => {
//           const { token, username } = JSON.parse(res.text);
//           if (token) {
//             document.cookie = `token=${token}`;
//             document.location = "/";
//           } else {
//             alert("invalid response from server");
//           }
//         })
//         .catch((err) => {
//           alert("error auto-logging in, please try login manually");
//         });
//     } catch (err) {
//       alert("error");
//     }
//   };
// };

const CreateEventPage = () => {
  const uploadedFile = useRef();
  const formDataUpper = useRef();
  const formDataBelow = useRef();
  const [eventImage, setEventImage] = useState(null);
  // const [eventId, setEventId] = useState(null);

  const clickUpload = () => {
    uploadedFile.current.click();
  };

  const updateEventImage = () => {
    const upload = uploadedFile.current;
    if (upload.files && upload.files[0]) {
      var reader = new FileReader();

      reader.onload = (e) => {
        setEventImage(e.target.result);
      };
      reader.readAsDataURL(upload.files[0]);
    }
  };

  const postData = () => {
    const eventId = 0;
    const data = {};
    const form = new FormData();
    const upload = uploadedFile.current;
    if (!upload.files || !upload.files[0]) throw new Error('No file uploaded');
    form.append('image', uploadedFile.current.files[0]);

    for (let key in formDataUpper.current) {
      if (
        key != 'startDate' &&
        key != 'startTime' &&
        key != 'endDate' &&
        key != 'endTime'
      )
        data[key] = formDataUpper.current[key].value;
    }
    for (let key in formDataBelow.current) {
      data[key] = formDataBelow.current[key].value;
    }
    // data["eventImage"] = imageName;
    data['startdatetime'] =
      formDataUpper.current['startDate'].value +
      'T' +
      formDataUpper.current['startTime'].value +
      ':00.000Z';
    data['enddatetime'] =
      formDataUpper.current['endDate'].value +
      'T' +
      formDataUpper.current['endTime'].value +
      ':00.000Z';
    console.log(JSON.stringify(data));
    request
      .post(`${config.API_URL}/events/create-event`)
      .withCredentials()
      .send(data)
      .then((res) => {
        // setEventId(res.body.eventId);
        // const eventId = res.body.eventId;
        const eventId = res.body.eventId;
        request
          .post(`${config.API_URL}/events/event-pic/${eventId}`)
          .withCredentials()
          .send(form)
          .then((res) => {
            //alert(res.body.eventId);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  // const uploadImage = async () => {
  //   const form = new FormData();
  //   const upload = uploadedFile.current;
  //   if (!upload.files || !upload.files[0]) throw new Error("No file uploaded");
  //   form.append("image", uploadedFile.current.files[0]);
  //   return request
  //     .post(`${config.API_URL}/events/event-pic/${eventId}`)
  //     .withCredentials()
  //     .send(form)
  //     .then(res => {
  //       return JSON.parse(res.text);
  //     });
  // };
  const btnStyle = () => {
    const upload = uploadedFile.current;
    return (upload && uploadedFile.current.files && uploadedFile.current.files[0]) ? {} : { backgroundColor: 'grey', 'border-color': 'transparent' }
  }

  const createEvent = async () => {
    const upload = uploadedFile.current;
    if (upload.files && upload.files[0]) {
      await postData();
      // await uploadImage();
      window.location.href = '/hirer/event';

    }
      
  };

  const onUploadClick = () => {
    const upload = uploadedFile.current;
    if (upload.files && upload.files[0]) {
      setAlert(true)
    }
  }
  const [showAlert, setAlert] = useState(false);

  return (
    // style from admin
    <div className='full-height create-event'>
      <Navbar />
      <div>
        <img
          className="create-event-cover-image create-event-bg-image"
          src="/bg-1.png"
        />
      </div>
      <div className='rest'>  
        <div className='container rounded-top rounded-lg shadow'>
          <h1> Create Event</h1>
          <div className='container-fluid'>
            <div className='row upload-image'>
              <div className='upload-image'>
                {eventImage && <img src={eventImage} />}

                <input
                  name='image'
                  ref={uploadedFile}
                  onChange={updateEventImage}
                  type='file'
                  hidden
                />
                <div
                  className={classnames({
                    overlay: true,
                    'force-show': !eventImage,
                  })}
                  onClick={clickUpload}>
                  <div>
                    <FontAwesomeIcon icon={faArrowCircleUp} />
                  </div>
                </div>
              </div>
              <div className='col'>
                <Form formDef={formUpper} ref={formDataUpper} />
              </div>
            </div>
            <Form formDef={formBelow} ref={formDataBelow} />

            <Modal className='center-popup' isOpen={showAlert}>
              <ConfirmDialog
                title='Confirm?'
                question='Do you want to create event'
                callback={(confirm) => {
                  setAlert(false);
                  if (confirm) {
                    // callbackAction.current();
                    createEvent();
                  }
                }}
              />
            </Modal>

            <button
              className='btn btn-primary mt-4'
              style={btnStyle()}
              onClick={
                onUploadClick
              }>
              {' '}
              Submit{' '}
            </button>
          </div>
        </div>
      </div>
      <div>
        <img
          className="create-event-cover-image2 create-event-bg-image2"
          src="/bg-2.png"
        />
      </div>
    </div>
  );
};

export default CreateEventPage;
