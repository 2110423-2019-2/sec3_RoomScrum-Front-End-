import React from "react";
import "./search-events-box.scss";
import { SlideBar } from "src/components/slide-bar";

const buttonBoxStyle = {
  width: 135
};

const OptionBox = ({ option, detail }) => {
  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-info m-2  "
        value={option}
        style={buttonBoxStyle}
      >
        <h6>{option}</h6>
        <h6>{detail}</h6>
      </button>
    </div>
  );
};

const SearchEventsBox = () => {
  const formBox = {
    position: "relative",
    width: "90%",
    padding: 20,
    margin: "auto",
    border: "solid 1px"
  };

  const optionBoxMaxWidth = {
    // maxWidth: 350
    // flex: '1 1 100%'
  };

  return (
    <div className="d-flex-row align-items-center justify-content-center">
      <h2 className="text-center">Event Search</h2>
      <div>
        <form style={formBox}>
          <SlideBar
            label={"Wage"}
            unit={"baht"}
            domain={[300, 20000]}
            values={[5000, 17000]}
          />
          <SlideBar
            label={"Duration"}
            unit={"mins"}
            domain={[0, 180]}
            values={[40, 154]}
          />
          <SlideBar
            label={"Distance"}
            unit={"km"}
            domain={[0, 200]}
            values={[40, 150]}
          />

          <label className="font-weight-bold d-flex mt-2">Event Time</label>
          <div
            className="d-flex flex-wrap justify-content-between"
            style={optionBoxMaxWidth}
          >
            <OptionBox option="Morning" detail="8:00-12:00" />
            <OptionBox option="Afternoon" detail="12.00 - 16.00" />
            <OptionBox option="Evening" detail="16.00 - 20.00" />
            <OptionBox option="Night" detail="20.00 - 24.00" />
          </div>

          <label className="font-weight-bold d-flex mt-2">Size</label>
          <div
            className="d-flex flex-wrap justify-content-between"
            style={optionBoxMaxWidth}
          >
            <OptionBox option="Small" detail="< 30 Attendances" />
            <OptionBox option="Medium" detail="30 - 80 Attendances" />
            <OptionBox option="Large" detail="80 - 150 Attendances" />
            <OptionBox option="Extra large" detail="> 150 Attendances" />
          </div>
        </form>
        <div className="container row no-gutters" style={formBox}>
          <button type="button" className="col btn btn-secondary mx-1">
            clear
          </button>
          <button type="button" className="col btn btn-primary mx-1">
            search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchEventsBox;
