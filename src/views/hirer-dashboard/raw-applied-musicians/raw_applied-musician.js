import React, { useState } from "react";
import { Navbar } from "src/components/common";
import { AppliedMusicianItem } from 'src/components/applied-musicians-item';
import request from "superagent";
import config from "src/config";
// import {Modal} from 'react-bootstrap';
import "./raw_applied_musician.scss";
import Image from 'react-image';

// const AppliedMusicianItem = ({ applicant }) => {
//   const {
//     eventId: eventId,
//     hiree: { firstName, lastName, username },
//     hireeId: hireeId,
//   } = applicant;
//   return (
//     <div className="AppliedMusicianItem">
//       <div className="MusicianImageContainer">
//         <Image
//           className="MusicianImage"
//           src={[config.API_URL + `/user/profile-pic/${hireeId}`]}
//         />
//       </div>
//       <div className="MusicianInfo">
//         <div className="Description">
//           <div className="Label">
//             {firstName} {lastName}
//           </div>
//           <div className="Value">{username}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

const Applicants = ({ eventId }) => {
  const [isFetch, setIsFetch] = useState(false);
  const [applicantsList, setApplicantsList] = useState([]);
  // const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);
  if (!isFetch) {
    request
      .get(`${config.API_URL}/application/event/${eventId}`)
      .withCredentials()
      .then((res) => {
        setIsFetch(true);
        setApplicantsList(res.body);
        console.log(res.body);
      })

      .catch((err) => {
        alert(err);
      });
  }

  const handleReject = (hireeId) => {
    for (let i = 0; i < applicantsList.length; i++) {
      if (applicantsList[i].hireeId == hireeId) {
        applicantsList.splice(i, 1);
      }
    }
    alert('foo')
    window.location.href = "/hirer/event";
    //to work with API
  }

  const appliedMusicianItem = applicantsList.map((each) => {
    return (
      <div>
        <AppliedMusicianItem each={each} onClick={handleReject} />
      </div>
    );
  });

  return (
    <div>
      <p class="applied-musician">Applied Musician</p>
      <div>{appliedMusicianItem}</div>
    </div>
  );
};

export default Applicants;
