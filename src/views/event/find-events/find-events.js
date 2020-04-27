import React, { useState, useRef } from "react";
import { Navbar } from "src/components/common";
import { SearchEventsBox } from "src/components/search-event-box";
import { EventItem } from "src/components/event-item";
import request from "superagent";
import config from "src/config";
import "./find-events.scss";

const FindEvents = () => {
  const [isFetch, setIsFetch] = useState(false);
  const [eventList, setEventList] = useState([]);
  const keywordInput = useRef();
  const searchInput = useRef();

  const getEvents = () => {
    request
      .post(`${config.API_URL}/events/search`)
      .send({
        searchType: 'default',
        value: '',
      })
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
    <div className="FindEvents">
      <Navbar />
      <div className="Title"> Find Events Page</div>
      <div className="SearchContainer">
        <div className="md-form mt-0 row">
          <input
            className="form-control col-8"
            ref={keywordInput}
            type="text"
          />
          <select id="cars" className="col-2" ref={searchInput}>
            <option value="default">search by all</option>
            <option value="name">search by name</option>
            <option value="description">search by description</option>
            <option value="location">search by location</option>
          </select>
          <div className="SubmitButtonContainer">
            <div className="SubmitButton col-2" onClick={advanceSearch}>
              Submit
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="EventItemContainer col-sm ">
          {eventItems}
        </div>
      </div>
    </div>
  );
};

export default FindEvents;
{/* <div className="EventItemContainer col-sm d-flex flex-wrap justify-content-between"></div> */}