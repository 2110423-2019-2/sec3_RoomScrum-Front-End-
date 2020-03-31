import React, { useState } from 'react';
import styled from 'styled-components';
import request from 'superagent';
import config from 'src/config';

const ContractModal = styled.div`
  background-color: #fcfcfc;
  overflow: scroll;
  padding: 50px;
  h1 {
    text-align: center;
    color: #364d9b;
    font-size: 40px;
    font-weight: bold;
  }
  .grey {
    color: #939393;
  }
  .grey:hover {
    cursor: pointer;
  }
`;

const Contract = ({ eventId }) => {
  const status = 'in review';
  const eventName = 'SE night miniconcert';
  const hirer = 'John Minian';
  const hiree = 'Little dog';
  const budget = '20,500 baht';
  const descritpion =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenasvitae justo faucibus, faucibus erat ut, tempor arcu. Vestibulum inenim augue. Nam in ante ex. Proin viverra feugiat facilisis. Aliquamrutrum egestas fringilla. Curabitur eget arcu luctus, malesuada enimmaximus, rhoncus odio. Sed consectetur leo sagittis tempor tempus.Etiam tempus. Lorem ipsum dolor sit amet, consectetur adipiscingelit. Maecenas vitae justo faucibus, faucibus erat ut, tempor arcu.Vestibulum in enim augue. Nam in ante ex. Proin viverra feugiatfacilisis. Aliquam rutrum egestas fringilla. Curabitur eget arculuctus, malesuada enim maximus, rhoncus odio. Sed consectetur leosagittis tempor tempus. Etiam tempus. Lorem ipsum dolor sit amet,consectetur adipiscing elit. Maecenas vitae justo faucibus, faucibuserat ut, tempor arcu.';

  // const edit = () => {
  //   alert('edit');
  // };
  const [eventInfo, setEventInfo] = useState();
  const [isFetch, setIsFetch] = useState(false);

  const getEvents = () => {
    return new Promise((resolve, reject) => {
      request
        .get(`${config.API_URL}/events/${eventId}`)
        .then(res => {
          setIsFetch(true);
          setEventInfo(res.body);
          console.log(res.body);
          resolve();
        })
        .catch(err => {
          alert(err);
          resolve(eventInfo);
        });
    });
  };
  if (!isFetch) {
    getEvents().then(() => {
      //assign ค่า

      console.log('end');
    });
  }

  return (
    <div>
      <ContractModal className='container-sm position-relative'>
        <h1>Contract</h1>
        <br />
        <div className='row'>
          <div className='label col-3'>Contract status</div>
          <div className='col-9'>
            <div className='status-color'>{status}</div>
          </div>
        </div>
        <div className='row'>
          <div className='label col-3'>Event name</div>
          <div className='col-9'>{eventName}</div>
        </div>
        <div className='row'>
          <div className='label col-3'>Hirrer</div>
          <div className='col-9'>{hirer}</div>
        </div>
        <div className='row'>
          <div className='label col-3'>Hiree</div>
          <div className='col-9'>{hiree}</div>
        </div>
        <div className='row'>
          <div className='label col-3'>Budget</div>
          <div className='col-9'>{budget}</div>
        </div>
        <div className='row '>
          <div className='label col-3'>Detail</div>
          <div className='col-9'>{descritpion}</div>
        </div>
        <br></br>
        {/**<div className='row '>
          <div className='label col-3'></div>
          <div className='col-9 grey' onClick={edit}>
            <FontAwesomeIcon icon={faEdit} /> Edit my Contract
          </div>
  </div>*/}
        {/**<div className='row position-absolute'>
          <Button name='reject' type='danger'></Button>
          <Button className='mr-auto' name='accept' type='primary'></Button>
  </div>*/}
      </ContractModal>
    </div>
  );
};

export default Contract;
