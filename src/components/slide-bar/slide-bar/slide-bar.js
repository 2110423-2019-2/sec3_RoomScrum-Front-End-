import React, { useState } from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';

function Track({ source, target, getTrackProps }) {
  return (
    <div
      style={{
        position: 'absolute',
        height: 10,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: '#546C91',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      }}
      {
        ...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */
      }
    />
  );
}

export function Handle({ handle: { id, value, percent }, getHandleProps }) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 30,
        height: 30,
        border: 0,
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: '#2C4870',
        color: '#333'
      }}
      {...getHandleProps(id)}>
      <div style={{ fontFamily: 'Roboto', fontSize: 14, marginTop: 30 }}>
        {value}
      </div>
    </div>
  );
}

const SlideBar = ({ label, unit, domain, values }) => {
  const sliderStyle = {
    position: 'relative',
    width: '100%',
    height: 0,
    margin: 'auto',
    // border: 'solid 1px',
    top: -20
  };

  const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 10,
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: '#8B9CB6'
  };

  const slideBarContainer = {
    position: 'relative',
    width: '100%',
    margin: 'auto',
    // border: 'solid 1px',
    height: 90
  };

  return (
    <div style={slideBarContainer}>
      <label className='font-weight-bold d-flex '>{label}</label>
      <Slider
        rootStyle={sliderStyle}
        domain={domain}
        step={1}
        mode={2}
        values={values}>
        <Rail>
          {({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className='slider-handles'>
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className='slider-tracks'>
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
    </div>
  );
};

export default SlideBar;
