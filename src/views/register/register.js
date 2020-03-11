import React, { useRef, useState } from "react";
import "./register.scss";
import { Navbar, Form } from "src/components/common";
import request from "superagent";
import config from "src/config";
import { userFormDef, musicianFormDef } from "./form-definition";
import FormV2 from "src/components/common/form/form-v2";
import { formStateBuilder } from "src/components/common/form/form-state";
import ImageUploader from "src/components/common/image-upload/image-upload";

const Registration = () => {
  const [userForm, dispatchUserForm] = formStateBuilder(userFormDef, {username: "rod41732", address:"12312312"})();
  const [musicianForm, dispatchMusicianForm] = formStateBuilder(
    musicianFormDef
  )();
  const [profileImage, setProfileImage] = useState(null);
  const [nationalCardImage, setNationalCardImage] = useState(null);
  const [accepted, setAccepted] = useState(false);

  const handleCheck = evt => {
    console.log(evt.target.checked);
    setAccepted(evt.target.checked);
  };

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
    // only validate if it's musician
    if (userForm["userType"].value == "M") {
      for (let key in musicianForm)
        if (musicianForm[key].errors && musicianForm[key].errors.length > 0) {
          hasError = true;
          break;
        }
    }
    if (hasError) {
      alert("Please enter all details");
      return;
    }
    const profileImageName = await request
      .post(`${config.API_URL}/user/temp-profile-pic`)
      .attach("image", profileImage)
      .then(res => {
        const { imageName } = JSON.parse(res.text);
        return imageName;
      })
      .catch(err => {
        alert("profile upload err");
        console.log(err);
        return null;
      });
    if (!profileImageName) return;

    let nationalCardImageName;
    if (userForm["userType"].value == "M") {
      nationalCardImageName = await request
        .post(`${config.API_URL}/user/temp-id-pic`)
        .attach("image", nationalCardImage)
        .then(res => {
          const { imageName } = JSON.parse(res.text);
          return imageName;
        })
        .catch(err => {
          alert("national card upload err");
          console.log(err);
          return null;
        });
      if (!nationalCardImageName) return;
    }
    alert("upload files success");

    const sendData = {};
    for (let key in userForm)
      if (!userFormDef[key].ignore) sendData[key] = userForm[key].value;

    for (let key in musicianForm)
      if (!musicianFormDef[key].ignore) sendData[key] = musicianForm[key].value;

    // hack
    sendData.gender = +userForm.gender.value;
    Object.assign(sendData, {
      profileImage: profileImageName,
      nationalCardImage: nationalCardImageName
    });

    try {
      await request.post(`${config.API_URL}/user/create`).send(sendData);
      request
        .post(`${config.API_URL}/auth/login`)
        .send({
          username: userForm.username.value,
          password: userForm.password.value
        })
        .then(res => {
          const { token, username } = JSON.parse(res.text);
          if (token) {
            document.cookie = `token=${token}`;
            document.location = "/";
          } else {
            alert("invalid response from server");
          }
        })
        .catch(err => {
          alert("error auto-logging in, please try login manually");
        });
    } catch (err) {
      alert("error");
    }
  };

  return (
    <div className="register bg-info">
      <Navbar />
      <div className="container rounded-top rounded-lg shadow">
        <h1>Registration</h1>
        <div className="row justify-content-center m-4">
          <ImageUploader
            setImageFile={setProfileImage}
            title="Upload Profile"
          />
        </div>
        <FormV2
          formData={userForm}
          dispatch={dispatchUserForm}
          formDef={userFormDef}
        />
        {userForm["userType"].value == "M" && ( // show only for musician
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
        )}
        <div class="form-check mt-4">
          <input
            type="checkbox"
            class="form-check-input"
            id="exampleCheck1"
            checked={accepted}
            onChange={handleCheck}
          />
          <label class="form-check-label" for="exampleCheck1">
            I accept <a href="#">terms and conditions</a>
          </label>
        </div>
        <button
          className="btn btn-`primary` m-4"
          onClick={submit}
          disabled={!accepted}
        >
          {" "}
          Register
          {" "}
        </button>
      </div>
    </div>
  );
};

export default Registration;
