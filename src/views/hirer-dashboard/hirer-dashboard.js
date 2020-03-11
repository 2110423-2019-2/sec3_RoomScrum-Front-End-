import React, { useRef, useState } from "react";
//import "./register.scss";
import { Navbar, Form } from "src/components/common";
import request from "superagent";
import config from "src/config";
import {MyEventItem} from "src/components/my-events-item";

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
      .get(`${config.API_URL}/events`)
      .then(res => {
        setIsFetch(true);
        setMyEventList(res.body);
        // setMyEventList('res.body');
        console.log(res.body);
      })
      .catch(err => {
        alert(err);
      });
    }

    const deleteItem =(eventId) => {
        for(let i = 0; i < myEventList.length; i++){
            if (myEventList[i].eventId == eventId){
              delete myEventList[i];
            }
        }
        request
          .post(`${config.API_URL}/events`)
          .withCredentials()
          .send(eventId)
          .catch(err => console.log(err));
     }

    const myEventItems = myEventList.map(each => {
        return (
          <div>
            <MyEventItem each={each} onClick={deleteItem}/>
          </div>
        );
    });

    return (
        <div>
          <Navbar/>
            {myEventItems}
        </div>
    )
    

};

export default HirerDashboard;