import React, { useState } from 'react';
import { Navbar } from 'src/components/common';
import { SearchEventsBox } from 'src/components/search-event-box';
import { EventItem } from 'src/components/event-item';
import request from 'superagent';
import config from 'src/config';

const FindEvents = () => {
  const [isFetch, setIsFetch] = useState(false);
  const [eventList, setEventList] = useState([]);
  if (!isFetch) {
    request
      .get(`${config.API_URL}/events`)
      .then(res => {
        setIsFetch(true);
        setEventList(res.body);
        console.log(res.body);
      })
      .catch(err => {
        alert(err);
      });
  }

  const eventItems = eventList.map(each => {
    return (
      <div>
        <EventItem each={each} />
      </div>
    );
  });

  return (
    <div className='FindEvents'>
      <Navbar />
      <div className='row no-gutters'>
        <div className='col-sm-3'>
          <SearchEventsBox />
        </div>
        <div className='col-sm d-flex flex-wrap justify-content-between'>
          {eventItems}
        </div>
      </div>
    </div>
  );
};

export default FindEvents;
