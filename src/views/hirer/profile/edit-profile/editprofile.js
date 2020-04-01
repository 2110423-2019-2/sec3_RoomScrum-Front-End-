import React, { useRef, useState } from "react";
import "./editprofile.scss";
import { Navbar, Form } from "src/components/common";
import request from "superagent";
import config from "src/config";
import { userFormDef, musicianFormDef } from "./form-definition";
import FormV2 from "src/components/common/form/form-v2";
import { formStateBuilder } from "src/components/common/form/form-state";
import ImageUploader from "src/components/common/image-upload/image-upload";
import { setForm } from 'src/components/common/form/fields'
import { Link } from 'react-router-dom';
const EditProfile = () => {

  const [userForm, dispatchUserForm] = formStateBuilder(userFormDef)();
  const [musicianForm, dispatchMusicianForm] = formStateBuilder(
    musicianFormDef
  )();
  const [profileImage, setProfileImage] = useState(null);
  const [nationalCardImage, setNationalCardImage] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [user, setUser] = useState({});
  const isFetch = useRef(false);
  if (!isFetch.current) {
    isFetch.current = true;
    console.log("hello");
    request.get(config.API_URL + '/auth/status')
    .withCredentials()
    .then(res => {
      request.get(config.API_URL + '/user/' + res.body.userId)
      .withCredentials()
      .then(res => {
        setUser(res.body);
        setForm(dispatchUserForm)(res.body);
      })
    })
    .catch(err => {
      alert("error" + JSON.stringify(err));
    })
  }

  const cancel = () => {
    alert("Are you sure to discard change?")
  }

  const submit = async () => {
    dispatchMusicianForm({ type: "PRE_SUBMIT" });
    dispatchUserForm({ type: "PRE_SUBMIT" });
    let hasError = false;
    for (let key in userForm) {
      console.log(userForm[key]);
      if (userForm[key].errors && userForm[key].errors.length > 0) {
        hasError = true;
        break;
      }
    }
    if (hasError) {
      alert("Please enter all details");
      return;
    }
    const sendData = user;
    for (let key in userForm)
      if (!userFormDef[key].ignore) sendData[key] = userForm[key].value;
    sendData.gender = +userForm.gender.value;
    try {
      request.post(`${config.API_URL}/user/update/${user.userId}`).send(user)
      .withCredentials()
      .then(() => {
        alert("Profile Updated")
        window.location.href = './me'
      })
    }
    catch (err) {
      alert("error");
    }
  };

  return (
     <div className="edit-profile bg-info">
       <div className="container rounded-top rounded-lg shadow">
         <h1>Edit Profile</h1>
         <FormV2
           formData={userForm}
           dispatch={dispatchUserForm}
           formDef={userFormDef}
         />
         <div className="btn-line">
          

           <Link className="text-muted " onClick={cancel}>
            Discard
          </Link>
          <body>     </body>
           <Link className="text-blue " onClick={submit}>
            Save
          </Link>
          

         </div>
       </div>
     </div>
  );
};

export default EditProfile;
