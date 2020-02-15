import React, { useState } from 'react';
import './event-item.scss';

const EventItem = () => {
  return (
    <div class='card event-item' style={{ width: 200 }}>
      <img
        class='card-img-top'
        src='http://dogs4family.taokweb.com/wp-content/uploads/2017/11/pikdog2324-275x275.jpg'
        alt='Card image cap'
      />{' '}
      <div class='card-body'>
        <h5 class='card-title'>Event name</h5>
        <p class='card-text'>Event address</p>
        <p class='card-text'>price</p>
        <p class='card-text'>rating 4.5 (10)</p>
        <p class='card-text'>hire name</p>
        <a href='#' class='btn btn-primary'>
          Go somewhere
        </a>
      </div>
    </div>
  );
};

export default EventItem;
