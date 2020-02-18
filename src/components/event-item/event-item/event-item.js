import React, { useState } from 'react';
import './event-item.scss';

const EventItem = ({ each }) => {
  return (
    <div className='card event-item' style={{ width: 200 }}>
      <img
        className='card-img-top'
        src='https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg&w=767'
        alt='Card image cap'
      />
      <div className='card-body'>
        <h5 className='card-title'>Event name -> id </h5>
        <p className='card-text'>information</p>
        <p className='card-text'>price</p>
        <p className='card-text'>rating 4.5 (10)</p>
        <p className='card-text'>hire name</p>
        <a href='#' className='btn btn-primary'>
          Go somewhere
        </a>
      </div>
    </div>
  );
};

export default EventItem;
