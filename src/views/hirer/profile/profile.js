import React, { useState, useRef } from "react";
import { useRouteMatch } from "react-router-dom";
import "./profile.scss";
import request from "superagent";
import config from "src/config";
import { userFormDef } from "src/views/register/form-definition";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import Image from "react-image";
import MyReviews from "src/views/review/my-reviews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfile from "./edit-profile";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Dialog from "src/components/common/dialog";
import moment from "moment";

export default () => {
  const isFetch = useRef(false);
  const [user, setUser] = useState({});
  const [profileImageFile, setProfileImageFile] = useState({});
  const [showEditDialog, setShowEditDialog] = useState(false);

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
    <div className="HirerProfilePage">
      <div className="ViewProfile">
        <div className="Title">{firstName + " " + lastName}</div>
        <div className="Alias">{"@" + username}</div>
        <Image
          className="ProfileImage"
          src={[config.API_URL + `/user/profile-pic/${userId}`]}
        />
        <div className="Description">
          <div className="Label">Birthdate</div>
          <div className="Value">
            {moment({birthdate}).format("MMM DD, YYYY") +
              " " +
              `(${moment({birthdate}).fromNow()}years old )`}
          </div>
        </div>
        <div className="Description">
          <div className="Label">Gender</div>
          <div className="Value">
            {gender}
          </div>
        </div>
        <div className="Description">
          <div className="Label">Location</div>
          <div className="Value">
            {address + " " + subdistrict + " " + district + " " + cityState + " " + country}
          </div>
        </div>
        <div className="Description">
          <div className="Label">Email</div>
          <div className="Value">
            {email}
          </div>
        </div>
        <div className="Description">
          <div className="Label">Phone Number</div>
          <div className="Value">
            {phoneNumber}
          </div>
        </div>
        

        <button
          className="edit-profile-button"
          onClick={() => setShowEditDialog(true)}
        >
          <FontAwesomeIcon icon={faEdit} />
          Edit my profile
        </button>
        <Dialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
        >
          <EditProfile
            userId={userId}
            onClose={() => setShowEditDialog(false)}
          />
        </Dialog>
      </div>
      <div className="navy-bg">
        <div className="ReviewTitle">Review</div>
        <div className="MyReviewContainer">
          {/* waiting for review process */}
          <MyReviews hirerId={userId} />
        </div>
      </div>
    </div>
  );
};
