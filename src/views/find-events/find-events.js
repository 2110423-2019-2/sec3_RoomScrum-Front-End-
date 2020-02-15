import React from 'react';
import { Navbar } from 'src/components/common';
import { SearchEventsBox } from 'src/components/search-event-box';
import { EventItem } from 'src/components/event-item';

const FindEvents = () => {
  return (
    <div className='FindEvents'>
      <Navbar />
      <h1> FindEvents Page</h1>
      <div className='row no-gutters'>
        <div className='col-sm-3 border border-primary'>
          <SearchEventsBox />
        </div>

        <div class='col-sm border border-primary d-flex flex-wrap'>
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
          <EventItem />
        </div>
      </div>
    </div>
  );
};

export default FindEvents;
