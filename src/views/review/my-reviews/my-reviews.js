import React, { useRef, useState } from "react";
//import "./register.scss";
import { Navbar, Form } from "src/components/common";
import request from "superagent";
import config from "src/config";
import MyReviewsItem from "src/components/my-reviews-item";

const MyReviews = (hirerID) => {

    const [isFetch, setIsFetch] = useState(false);
    const [myReviewsList, setMyReviewsList] = useState([]);

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
      .get(`${config.API_URL}/review/of-user/${hirerID}`)
      .withCredentials()
      .then(res => {
        setIsFetch(true);
        console.log(res.body);
        setMyReviewsList(res.body);
        // setMyEventList('res.body');
        
      })
      .catch(err => {
        alert(err);
      });
    }

    const myReviewsItems = myReviewsList.map(each => {
        return (
          <div>
            <MyReviewsItem each={each}  />
          </div>
        );
    });


    return (
        <div>
            {myReviewsItems}
        </div>
    )
    

};

export default MyReviews;