import React, { useRef, useState } from "react";
// import "./hirer-dashboard.scss";
import { Navbar, Form } from "src/components/common";
import request from "superagent";
import config from "src/config";
import { MyEventItem } from "src/components/my-events-item";

const HirerDashboard = () => {
  const [show, setShow] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [myEventList, setMyEventList] = useState([]);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  // const hirerId = () => {
  //   request
  //   .get(`${config.API_URL}/events`)
  //   .then(res => {
  //     setIsFetch(true);
  //     setMyEventList(res.body);
  //     console.log(res.body);
  //   })
  //   .catch(err => {
  //     alert(err);
  //   });

  // }

  if (!isFetch) {
    request
      .post(`${config.API_URL}/events/find-my-event`)
      .withCredentials()
      .then((res) => {
        setIsFetch(true);
        console.log(res.body);
        setMyEventList(res.body);
        // setMyEventList('res.body');
      })
      .catch((err) => {
        alert(err);
      });
  }

  const deleteItem = (eventId) => {
    for (let i = 0; i < myEventList.length; i++) {
      if (myEventList[i].eventId == eventId) {
        myEventList.splice(i, 1);
      }
    }
    request
      .get(`${config.API_URL}/events/cancel/${eventId}`)
      .withCredentials()
      .send(eventId)
      .then(() => {
        window.location.href = "/hirer/event";
      })
      .catch((err) => console.log(err));
  };

  const myEventItems = myEventList.map((each) => {
    return (
      <div>
        <MyEventItem each={each} onClick={deleteItem} />
      </div>
    );
  });

  return <div>{myEventItems}</div>;
};

export default HirerDashboard;
