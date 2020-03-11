import React, { useState, useRef } from "react";
import { useRouteMatch } from "react-router-dom";
import "./profile.scss";
import request from "superagent";
import config from "src/config";
import { userFormDef } from "src/views/register/form-definition";

export default () => {
  const isFetch = useRef(false);
  const [user, setUser] = useState({});
  const [profileImageFile, setProfileImageFile] = useState({});

  if (!isFetch.current) {
    isFetch.current = true;
    
    request.get(config.API_URL + '/auth/status')
    .withCredentials()
    .then(res => {

      const userId = res.body.userId;
      request.get(config.API_URL + '/user/' + userId)
      .then(res => {
        setUser(res.body);
      })
      request.get(config.API_URL + '/user/profile-pic/' + userId)
      .then(res => {
        setProfileImageFile(res.body);
      })
  
    })
    .catch(err => {
      alert("error getting login status");
      console.error(err);
    })
  }
  let {username, firstName, lastName, email, phoneNumber, gender, birthdate, address, subdistrict, district, cityState, country, zipcode,profileImage } = user;
  console.log({profileImageFile})

  if(gender==1) {
    gender = "Male"
  } else if(gender==2) {
    gender="Female"
  } else {
    gender="Other"
  }
  return (
    <div className="container view-profile">
      <div className="row pt-4 pl-5">
        <div className="col-sm-6">
          <div className="row pb-4">
            <div className="col-sm-3">
              Username
        </div>
            <div className="col-sm-8 border">
              {username}
        </div>
            <div className="col-sm-1">
            </div>
          </div>
          <div className="row pb-4">
            <div className="col-sm-3">
              First Name
        </div>
            <div className="col-sm-8 border">
              {firstName}
        </div>
            <div className="col-sm-1">
            </div>
          </div>
          <div className="row pb-4">
            <div className="col-sm-3">
              Last Name
        </div>
            <div className="col-sm-8 border">
              {lastName}
        </div>
            <div className="col-sm-1">
            </div>
          </div>
          <div className="row pb-4">
            <div className="col-sm-3">
              Email
        </div>
            <div className="col-sm-8 border">
              {email}
        </div>
            <div className="col-sm-1">
            </div>
          </div>
          <div className="row pb-4">
            <div className="col-sm-3">
              Phone Number
        </div>
            <div className="col-sm-8 border">
              {phoneNumber}
        </div>
            <div className="col-sm-1">
            </div>
          </div>
          <div className="row pb-4">
            <div className="col-sm-3">
              Gender
        </div>
            <div className="col-sm-8 border">
             {gender}
        </div>
            <div className="col-sm-1">
            </div>
          </div>
          <div className="row pb-4">
            <div className="col-sm-3">
              Birth of Date
        </div>
            <div className="col-sm-8 border">
              {birthdate}
        </div>
            <div className="col-sm-1">
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="row pic pb-4">
            <div className="col-sm-5"></div>
            <div className="img col-sm-3 border">
              <img src = {profileImageFile}/>
            </div>
            <div className="col-sm-4"></div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              Address
        </div>
            <div className="col-sm-8">
              <div className="address">
                {address + ", " + subdistrict + ", " + district + ", " + cityState + ", " + country + ", " + zipcode}
              </div>
            </div>
            <div className="col-sm-1 ">
            </div>
          </div>

        </div>
      </div>
      <button className='posit'
      onClick={()=>{window.location.href = './edit'}}>
          Edit
        </button>
    </div>
  );
};
