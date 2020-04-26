import React, { useState, useRef } from "react";
import { useRouteMatch } from "react-router-dom";
import "./profile.scss";
import request from "superagent";
import config from "src/config";
import { userFormDef } from "src/views/register/form-definition";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Image from "react-image";
import MyReviews from "src/views/review/my-reviews"

export default () => {
  const isFetch = useRef(false);
  const [user, setUser] = useState({});
  const [profileImageFile, setProfileImageFile] = useState({});
  const report = async () => {};
  if (!isFetch.current) {
    isFetch.current = true;

    request
      .get(config.API_URL + "/auth/status")
      .withCredentials()
      .then((res) => {
        const userId = res.body.userId;
        request.get(config.API_URL + "/user/" + userId).then((res) => {
          setUser(res.body);
        });
        request
          .get(config.API_URL + "/user/profile-pic/" + userId)
          .then((res) => {
            setProfileImageFile(res.body);
          });
      })
      .catch((err) => {
        alert("error getting login status");
        console.error(err);
      });
  }
  let {
    username,
    userId,
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
    birthdate,
    address,
    subdistrict,
    district,
    cityState,
    country,
    zipcode,
    profileImage,
    bio,
  } = user;
  console.log({ profileImageFile });

  if (gender == 1) {
    gender = "Male";
  } else if (gender == 2) {
    gender = "Female";
  } else {
    gender = "Other";
  }
  return (
    <div className="container view-profile">
      <div className="row high">
        <div className="col-md-7">
          <div className="row">
            <div className="col-md-12 text-primary text-center pt-3 size font-weight-bold">
              {firstName + " " + lastName}
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 text-primary text-center pt-3">
              {"@" + username}
            </div>
          </div>

          <div className="row pt-4">
            <div className="col-sm-12 text-center">
              <Image
                className="Image"
                src={[config.API_URL + `/user/profile-pic/${userId}`]}
              />
            </div>
          </div>

          <div className="row pt-4 font-weight-bold pl-5 textcolor">
            Birthdate
          </div>

          <div className="row pt-2 pl-5 textcolor">{birthdate}</div>

          <div className="row pt-2 font-weight-bold pl-5 textcolor">
            Location
          </div>

          <div className="row pt-2 pl-5 textcolor">
            {subdistrict + "," + district + "," + cityState + "," + country}
          </div>

          <div className="row pt-2 font-weight-bold pl-5 textcolor">About</div>

          <div className="row pt-2 pl-5 pr-5 textcolor">{bio}</div>

          <div className="row pt-2 pl-5 textcolor">
            <Link
              className="text-blue"
              onClick={() => {
                window.location.href = "./edit";
              }}
            >
              Edit my profile
            </Link>
          </div>
        </div>

        <div className="col-md-5  ReviewContainer">
          <div className="row  ReviewTitle">Review</div>
          <div className="row pt-4 pl-5 text-dark">
            {/* waiting for review process */}
            <MyReviews hirerId={userId}/>
          </div>
        </div>
      </div>
    </div>
  );
};
