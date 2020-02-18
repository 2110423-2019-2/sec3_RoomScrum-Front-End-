import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import './musician-info-dialog.scss';
import request from 'superagent';
import config from 'src/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faTimes } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert';
import { ConfirmDialog } from 'src/components/common';

const Field = ({fieldName, value}) => {
    return  (
        <>
            <dt className="col-sm-4"> {fieldName}</dt>
            <dd className="col-sm-8 m-0"> {value} </dd>
        </>
    )
}


const calcAge = (date1, date2) => {
    return Math.floor((date1 - date2)/ 24/3600/365.25/1000); 
}


Modal.setAppElement("#root")
export default ({
    isOpen,
    onRequestClose,
    onRejectSuccess, // callbacks to notify parent when API call is success
    onAcceptSuccess,
    userInfo,
}) => {
    const [image, setImage] = useState(null);
    const [showAlert, setAlert] = useState(false);
    const [dialogState, setDialogState] = useState({})
    const callbackAction = useRef();
    const {
        userId, username, password, firstName,
        lastName, nationalId, gender, birthdate,
        email, phoneNumber, address, subdistrict,
        district, cityState, country, zipCode,
        profileImage, isMusician, bio, tags = ["foo", "bar", "baz"] ,
        musicianApprovement, nationalCardImage, videoUrl, hireeId,
    } = userInfo;

    
    const requestAcceptMusician = (userId) => () => {
        request.post(`${config.API_URL}/admin/user/approve`)
        .send({id: userId})
        .then(() => {
            onAcceptSuccess();
            onRequestClose();
            alert("Approve User OK");
        })
        .catch(err => {
            console.error(err);
            alert("Approve User Error")
        })
    };
    const requestRejectMusician = (userId) => () => {
        request.post(`${config.API_URL}/admin/user/reject`)
        .send({id: userId})
        .then(() => {
            onRejectSuccess();
            alert("Reject User OK");
            onRequestClose();
        })
        .catch(err => {
            console.error(err);
            alert("Reject User Error");
        })
    }

    
    const acceptMusician = (userId) => {
        setAlert(true);
        setDialogState({
            title: "Accept Musician",
            question: "Are you sure you want to accept this musician ?",
        })
        callbackAction.current = requestAcceptMusician(userId);
    }

    const rejectMusician = (userId) => {
        setAlert(true);

        setDialogState({
            title: "Reject Musician",
            question: "Are you sure you want to reject this musician ?",
        })
        callbackAction.current = requestRejectMusician(userId);
    }

    

    

    return (
        <>
            <Modal className="musician-info-dialog shadow rounded-lg" isOpen={isOpen} onRequestClose={onRequestClose}>
                <button className="top-right btn" onClick={onRequestClose}>
                    <FontAwesomeIcon icon={faTimes}/>
                </button>
                <div className="dialog-content row justify-content-center m-0">
                    <div className="center">
                        <img src={profileImage} className="profile-image btn img-btn" onClick={() => {
                            setImage(profileImage);
                        }}/>
                    </div>
                    <div className="col-12"></div>
                    <div className="col-12 col-sm-10 mt-4 info">
                        <dl className="row">
                            <Field fieldName="Name" value={`${firstName} ${lastName}`}/>
                            <Field fieldName="Gender" value={gender}/>
                            <Field fieldName="Age" value={calcAge(new Date(), new Date(birthdate))}/>
                            <Field fieldName="Bio" value={bio}/>
                            <Field fieldName="nationalId" value={nationalId}/>
                            <Field fieldName="Genres" value={tags.join(", ")}/>
                            <Field fieldName="Email" value={email}/>
                            <Field fieldName="Tel" value={phoneNumber}/>
                            <Field fieldName="Address" value={<div>
                                {address}, {subdistrict} <br/>
                                {district}, {cityState}, {zipCode}, {country}
                            </div>}/>
                            <Field fieldName="Video" value={
                                <a href={videoUrl}> {videoUrl}</a>
                            }/>
                            <Field fieldName="Nation Card Image" value={
                                <img src={nationalCardImage} className="national-id-image btn img-btn" onClick={() => {
                                    setImage(nationalCardImage);
                                }}/>
                            }/>
                        </dl>
                    </div>
                    <div className="col-12">
                        <div className="row justify-content-between m-3">
                            <button onClick={() => acceptMusician(userId)} className="btn btn-success col-6 rounded-0"> Accept </button>
                            <button onClick={() => rejectMusician(userId)} className="btn btn-danger col-6 rounded-0"> Reject </button>
                        </div>
                    </div>

                </div>
            </Modal>
            <Modal isOpen={image !== null} onRequestClose={() => setImage(null)} className="center-popup">
                <div className="bg-white content shadow-lg">
                    <div className="btn float-right" onClick={() => setImage(null)}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </div>
                    <div>
                        <img src={image}/>
                    </div>
                </div>
            </Modal>
            <Modal className="center-popup" isOpen={showAlert}>
                <ConfirmDialog {...dialogState} callback={confirm => {
                    setAlert(false);
                    if (confirm) {
                        callbackAction.current();
                    }
                }}/>
            </Modal>
        </>
    )
}
