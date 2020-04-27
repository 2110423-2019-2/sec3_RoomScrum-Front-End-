import React, { useState } from "react";
import Modal from "react-modal";
import request from "superagent";
import config from "src/config";
import Image from "react-image";
import { sortByTimestampDesc } from "src/views/musician-dashboard/util";

const MyMusicianItem = ({
  musician: {
    hireeId,
    hiree: {
      firstName,
      lastName,
      gender,
      birthdate,
      address,
      subdistrict,
      district,
      cityState,
      zipcode,
      country,
      phoneNumber,
      email,
      bio,
    },
  },
}) => {
  return (
    <div className="EventInfo col-6">
      <div className="Title">{firstName} {lastName}</div>
      <Image
        className="Image"
        src={[config.API_URL + `/user/profile-pic/${hireeId}`]}
      />
      <div className="Description">
        <div className="Label">Gender</div>
        <div className="Value">
          {gender}
        </div>
      </div>
      {/* <h6>Time</h6>
            <p1>{each.startdatetime.substr(11,8)} {each.startdatetime.substr(0,10)} to {each.enddatetime.substr(11,8)} {each.enddatetime.substr(0,10)}</p1> */}
      <div className="Description">
        <div className="Label">Address</div>
        <div className="Value">
          {address} {subdistrict} {district} {cityState} {country}
        </div>
      </div>
      <div className="Description">
        <div className="Label">Phone Number</div>
        <div className="Value">{phoneNumber}</div>
      </div>
      <div className="Description">
        <div className="Label">Email</div>
        <div className="Value">{email}</div>
      </div>
      <div className="Description">
        <div className="Label">About</div>
        <div className="Value">{bio}</div>
      </div>      
      {/* <button onClick={() => doDelete(event.eventId)} > Cancel </button> */}
    </div>
  );
};

const MyMusician = ({ eventId }) => {
  const [isFetch, setIsFetch] = useState(false);
  const [myMusicianList, setMyMusicianList] = useState([]);

  const getMusician = () => {
    request
      .get(`${config.API_URL}/application/${eventId}/accepted-hiree`)
      .withCredentials()
      .then((res) => {
        const lists = res.body;
        setMyMusicianList(lists);
        
        alert(lists)
      })
      .catch((err) => {
        alert(err);
      });
  };

  if (!isFetch) {
    setIsFetch(true);
    getMusician();
  }

  return (
    <div >
      {myMusicianList.map((musician) => (
        <>
          <MyMusicianItem
            musician={musician}
          />
        </>
      ))}
    </div>
  );
};

export default MyMusician;
