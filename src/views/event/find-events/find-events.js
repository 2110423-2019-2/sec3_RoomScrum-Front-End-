import React, { useState, useRef } from 'react';
import { Navbar } from 'src/components/common';
import { SearchEventsBox } from 'src/components/search-event-box';
import { EventItem } from 'src/components/event-item';
import request from 'superagent';
import config from 'src/config';

const FindEvents = () => {
  const [isFetch, setIsFetch] = useState(false);
  const [eventList, setEventList] = useState([]);
  const keywordInput = useRef();
  const searchInput = useRef();

  const getEvents = () => {
    request
      .get(`${config.API_URL}/events`)
      .then((res) => {
        setIsFetch(true);
        setEventList(res.body);
        console.log(res.body);
      })
      .catch((err) => {
        alert(err);
      });
  };

  if (!isFetch) {
    getEvents();
  }

  const advanceSearch = () => {
    request
      .post(`${config.API_URL}/events/search`)
      .send({
        searchType: searchInput.current.value,
        value: keywordInput.current.value,
      })
      .then((res) => {
        setEventList(res.body);
      })
      .catch((err) => {
        getEvents();
      });
  };

  const eventItems = eventList.map((each) => {
    return (
      <div>
        <EventItem each={each} />
      </div>
    );
  });

  return (
    <div className='FindEvents'>
      <Navbar />
      <h1> FindEvents Page</h1>
      <div className='container'>
        <div className='md-form mt-0 row'>
          <input
            className='form-control col-8'
            ref={keywordInput}
            type='text'
          />
          <select id='cars' className='col-2' ref={searchInput}>
            <option value='default'>sarch by all</option>
            <option value='name'>sarch by name</option>
            <option value='description'>sarch by description</option>
            <option value='location'>search by location</option>
          </select>
          <button className='col-2' onClick={advanceSearch}>
            submit
          </button>
        </div>
      </div>
      <div className='row no-gutters'>
        <div className='col-sm border border-primary d-flex flex-wrap justify-content-between'>
          {eventItems}
        </div>
      </div>
    </div>
  );
};

export default FindEvents;
