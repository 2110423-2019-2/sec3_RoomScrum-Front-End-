import React, { useState } from "react";
import "./my-review-item.scss";

const MyReviewsItem = ({ each }) => {
  const { timeStamp, description } = each;
  return (
    <div className="MyReviewItem">
      <div className="Text">
          {description}
      </div>
      <div className="TimeStamp">
          {timeStamp.substr(11, 8)}{" "}{timeStamp.substr(0,10)}
      </div>
    </div>
  );
};

export default MyReviewsItem;

//to be mapped with Review List
//Get Review List by GET: /review/of-user/${hirerID}
