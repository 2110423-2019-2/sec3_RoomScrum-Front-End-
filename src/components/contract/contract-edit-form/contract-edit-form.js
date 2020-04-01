import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import request from 'superagent';
import config from 'src/config';
import { Button } from 'src/components/common';

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
const ContractEditForm = ({ eventId }) => {
  //oil-ข้อมูลที่ได้จากการเอา eventId มา get contract todo-start
  const contract = {
    status: 'in review',
    eventName: 'SE night miniconcert',
    hirer: 'John Minian',
    hiree: 'Little dog',
    budget: '20,500 baht',
    descritpion:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenasvitae justo faucibus, faucibus erat ut, tempor arcu. Vestibulum inenim augue. Nam in ante ex. Proin viverra feugiat facilisis. Aliquamrutrum egestas fringilla. Curabitur eget arcu luctus, malesuada enimmaximus, rhoncus odio. Sed consectetur leo sagittis tempor tempus.Etiam tempus. Lorem ipsum dolor sit amet, consectetur adipiscingelit. Maecenas vitae justo faucibus, faucibus erat ut, tempor arcu.Vestibulum in enim augue. Nam in ante ex. Proin viverra feugiatfacilisis. Aliquam rutrum egestas fringilla. Curabitur eget arculuctus, malesuada enim maximus, rhoncus odio. Sed consectetur leosagittis tempor tempus. Etiam tempus. Lorem ipsum dolor sit amet,consectetur adipiscing elit. Maecenas vitae justo faucibus, faucibuserat ut, tempor arcu.'
  };
  //oil-ข้อมูลที่ได้จากการเอา eventId มา get contract todo-end

  //oil-flatten contract ที่ get มา todo-start
  const { status, eventName, hirer, hiree, budget, descritpion } = contract;
  //oil-flatten contract ที่ get มา todo-end

  //
  // useEffect(() => {
  //   let val = callbackContractFunction(contract);
  // }, [callbackContractFunction]);
  //

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
        <h1>Edit Contract</h1>
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
      </ContractModal>
      <ContractModal>
        <div className='d-flex flex-row-reverse'>
          <Button className='mr-auto' name='Save' type='primary'></Button>
          <Button className='mr-auto' name='Discard' type='secondary'></Button>
        </div>
      </ContractModal>
    </div>
  );
};

export default ContractEditForm;
