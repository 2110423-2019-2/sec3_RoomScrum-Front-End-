import React, { useState } from 'react';
import Modal from 'react-modal';
import './my-review-item.scss';
import request from 'superagent';
import config from 'src/config';

const MyReviewsItem = ({ each }) => {

    const {
      ///
    } = each;
    return (
      <div  className='my-review-item' >
        <div >
          <div>
            <p1 > My Review </p1>
          </div>
          <div>
            <p1 > ... </p1>
          </div>

       </div>
      </div>
    );
  };
  
  export default MyReviewsItem;