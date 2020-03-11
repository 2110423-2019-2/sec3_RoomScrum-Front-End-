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

const EditProfile = () => {

  const [userForm, dispatchUserForm] = formStateBuilder(userFormDef)();
  const [musicianForm, dispatchMusicianForm] = formStateBuilder(
    musicianFormDef
  )();
  const [profileImage, setProfileImage] = useState(null);
  const [nationalCardImage, setNationalCardImage] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [user, setUser] = useState({});

  // const handleCheck = evt => {
  //   console.log(evt.target.checked);
  //   setAccepted(evt.target.checked);
  // };

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

//   const revert () => {

//   }

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
    
    // const profileImageName = await request
    //   .post(`${config.API_URL}/user/temp-profile-pic`)
    //   .attach("image", profileImage)
    //   .then(res => {
    //     const { imageName } = JSON.parse(res.text);
    //     return imageName;
    //   })
    //   .catch(err => {
    //     alert("profile upload err");
    //     console.log(err);
    //     return null;
    //   });
    // if (!profileImageName) return;

    // let nationalCardImageName;
    // if (userForm["userType"].value == "M") {
    //   nationalCardImageName = await request
    //     .post(`${config.API_URL}/user/temp-id-pic`)
    //     .attach("image", nationalCardImage)
    //     .then(res => {
    //       const { imageName } = JSON.parse(res.text);
    //       return imageName;
    //     })
    //     .catch(err => {
    //       alert("national card upload err");
    //       console.log(err);
    //       return null;
    //     });
    //   if (!nationalCardImageName) return;
    // }
    // alert("upload files success");

    const sendData = user;
    for (let key in userForm)
      if (!userFormDef[key].ignore) sendData[key] = userForm[key].value;

    // for (let key in musicianForm)
    //   if (!musicianFormDef[key].ignore) sendData[key] = musicianForm[key].value;

    // hack
    sendData.gender = +userForm.gender.value;
    // Object.assign(sendData, {
    //   profileImage: profileImageName,
    //   nationalCardImage: nationalCardImageName
    // });

    try {
      // await 
      request.post(`${config.API_URL}/user/update/${user.userId}`).send(user)
      .withCredentials()
      .then(() => alert("OK"))
        // request
        // .post(`${config.API_URL}/auth/login`)
        // .send({
        //   username: userForm.username.value,
        //   password: userForm.password.value
        // })
        // .then(res => {
        //   const { token, username } = JSON.parse(res.text);
        //   if (token) {
        //     document.cookie = `token=${token}`;
        //     document.location = "/";
        //   } else {
        //     alert("invalid response from server");
        //   }
        // })
        // .catch(err => {
        //   alert("error auto-logging in, please try login manually");
        // });
    } 
    catch (err) {
      alert("error");
    }
  };

  return (
    <div className="edit-profile bg-info">
      <div className="container rounded-top rounded-lg shadow">
        <h1>Edit Profile</h1>
        {/* <div className="row justify-content-center m-4">
          <ImageUploader
            setImageFile={setProfileImage}
            title="Upload Profile"
          />
        </div> */}
        <FormV2
          formData={userForm}
          dispatch={dispatchUserForm}
          formDef={userFormDef}
        />
        {/* {userForm["userType"].value == "M" && ( // show only for musician
          <FormV2
            formData={musicianForm}
            dispatch={dispatchMusicianForm}
            formDef={musicianFormDef}
          />
        )}
        {userForm["userType"].value == "M" && ( // show only for musician
          <div className="row justify-content-center mt-4">
            <ImageUploader
              setImageFile={setNationalCardImage}
              title="Upload National Card"
            />
          </div>
        )} */}
        <button
          className="btn btn-`primary` m-4"
          onClick={submit}
        >
          {" "}
          Save
          {" "}
        </button>
        {/* <button
          className="btn btn-`primary` m-4"
          onClick={revert}
        >
          {" "}
          Revert
          {" "}
        </button> */}
      </div>
    </div>
  );
};

export default EditProfile;
