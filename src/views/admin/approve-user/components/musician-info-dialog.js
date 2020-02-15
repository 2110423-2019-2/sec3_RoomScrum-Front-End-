import React from 'react';
import Modal from 'react-modal';
import './musician-info-dialog.scss';
import request from 'superagent';
import config from 'src/config';

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
    const {
        userId, username, password, firstName,
        lastName, nationalId, gender, birthdate,
        email, phoneNumber, address, subdistrict,
        district, cityState, country, zipCode,
        imageProfile, isMusician, bio, tags,
        isVerify, nationalCardImage, videoUrl, hireeId,
    } = userInfo;
    
    const acceptMusician = () => {
        request.post(`${config.API_URL}/admin/user/approve`)
        .send({id: userId})
        .then(() => {
            onAcceptSuccess();
            alert("Approve User OK");
        })
        .catch(err => {
            console.error(err);
            alert("Approve User Error")
        })
    }

    const rejectMusician = () => {
        request.post(`${config.API_URL}/admin/user/reject`)
        .send({id: userId})
        .then(() => {
            onRejectSuccess();
            alert("Reject User OK");
        })
        .catch(err => {
            console.error(err);
            alert("Reject User Error");
        })
    }

    return (
        <Modal className="musician-info-dialog shadow rounded-lg" isOpen={isOpen} onRequestClose={onRequestClose}>
            <div className="dialog-content row justify-content-center m-0">
                <div className="center">
                    <img src={imageProfile}/>
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
                            <img src={nationalCardImage}/>
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
    )
}

// const fieldNameMap = {
//     userId: null,
//     username: null,
//     password: null,
//     firstname: 'First Name',
//     lastname: 'Last Name',
//     nationalId: 'National ID',
//     gender: 'Gender',
//     birthdate: 'Birthdate',
//     email: 'Email',
//     phoneNumber: '',
//     address: 
//     subdistrict: 
//     district: 
//     cityState: 
//     country: 
//     zipcode: 
//     imageProfile: 
//     isMusician: 
//     bio: 
//     {tag}: 
//     isVerify: 
//     nationalCardImage: 
//     videoUrl: 
//     hireeId: 
// }