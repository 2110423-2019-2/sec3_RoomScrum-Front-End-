import React, { useRef, useState } from "react";
import { Navbar, Form } from "src/components/common";
import request from "superagent";
import config from "src/config";
import { MyEventItem } from "src/components/my-events-item";
import { sortByTimestampDesc } from "src/views/musician-dashboard/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import EmptyMessage from "src/components/common/empty-message";
import './hirer-dashboard.scss'
const HirerDashboard = () => {
  const [show, setShow] = useState(false);
  const [isFetch, setIsFetch] = useState(false);
  const [myEventList, setMyEventList] = useState([]);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const getEvents = () => {
    request
      .post(`${config.API_URL}/events/find-my-event`)
      .withCredentials()
      .then((res) => {
        const lists = res.body;
        lists.sort(sortByTimestampDesc);
        setMyEventList(lists);
        setIsFetch(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  if (!isFetch) {
    getEvents();
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

    return (
      <div>
        {( myEventList && myEventList.length > 0 )? (
           myEventList.map(each => <MyEventItem each={each} onClick={deleteItem} />)
        ) : (
          <EmptyMessage>
            <div className="no-invitation">
              <FontAwesomeIcon icon={faTimes} className="icon" />
              <div> No Event </div>
              <div> Create Now! </div>
            </div>
          </EmptyMessage>
        )}
      </div>
    );

  

};

export default HirerDashboard;
