import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import request from 'superagent';
import config from 'src/config';
import { Button } from 'src/components/common';
import cancelContractButton from '../cancel-contract-button';
import {
  HireeEventStatusIndicator,
  PaymentStatusIndicator,
  ContractStatusIndicator,
  ContractStatusColorIndicator,
} from 'src/components/event-item/status-indicator/status-indicator';

const InputField = React.forwardRef(
  ({ name, type, place, isTextarea }, ref) => {
    const [value, setValue] = useState(place);
    const handleChange = (event) => {
      setValue(event.target.value);
    };

    if (ref) {
      ref.current = value;
    }

    if (isTextarea) {
      return (
        <div className='form-group row'>
          <div className='col-sm-12'>
            <textarea
              type={type}
              value={value}
              onChange={handleChange}
              className={'form-control '}
              id={name}
            />
          </div>
        </div>
      );
    }
    return (
      <div className='form-group row'>
        <div className='col-sm-12'>
          <input
            type={type}
            value={value}
            onChange={handleChange}
            className={'form-control '}
            id={name}
          />
        </div>
      </div>
    );
  }
);

const ContractModal = styled.div`
  background-color: #fcfcfc;
  overflow: scroll;
  padding: 50px;
  min-width: 900px;
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
  textarea {
    min-height: 400px;
    overflow: hidden;
  }
`;
const ContractEditForm = ({ application }) => {
  //oil-ข้อมูลที่ได้จากการเอา eventId มา get contract todo-start
  const [hiree, setHiree] = useState('-');
  const {
    contract: contract,
    event: {
      eventName,
      eventId,
      district,
      province,
      userId: hirerId,
      price,
      user: {
        // hirer
        firstName: hirerFirstName,
        lastName: hirerLastName,
      },
    },
  } = application;

  //oil-ข้อมูลที่ได้จากการเอา eventId มา get contract todo-end

  const [eventInfo, setEventInfo] = useState();
  const budgetInput = useRef();
  const detailInput = useRef();
  const saveEditContract = () => {
    request
      .post(`${config.API_URL}/contract/6`) // get my applications, with event detail
      .send({
        eventId: 6,
        price: 1001,
        description: 'Hello world 5555',
      })
      .withCredentials()
      .then((res) => {
        // const applications = res.body;
        // applications.sort(sortByTimestampDesc);
        // setApplications(applications);
        //OIL
        console.log(res.body);
        //OIL
      })
      .catch((err) => {
        alert('Error getting applied events ');
        console.error('Error: Fetch applied events');
      });
  };

  //
  return (
    <div>
      <ContractModal className='container-sm position-relative'>
        <h1>Edit Contract</h1>
        <br />
        <div className='row'>
          <div className='label col-3'>Contract status</div>
          <div className='col-9'>
            <ContractStatusIndicator contractStatus={contract.status} />
          </div>
        </div>
        <div className='row'>
          <div className='label col-3'>Event name</div>
          <div className='col-9'>{eventName}</div>
        </div>
        <div className='row'>
          <div className='label col-3'>Hirrer</div>
          <div className='col-9'>
            {hirerFirstName} {hirerLastName}
          </div>
        </div>
        <div className='row'>
          <div className='label col-3'>Hiree</div>
          <div className='col-9'>{hiree}</div>
        </div>
        <div className='row'>
          <div className='label col-3'>Budget</div>
          <div className='col-9'>
            <InputField name='budget' text={price} place={price} />
          </div>
        </div>
        <div className='row '>
          <div className='label col-3'>Detail</div>
          <div className='col-9'>
            <InputField
              name='detail'
              text={price}
              place={contract.description || '-'}
              isTextarea
            />
          </div>
        </div>
      </ContractModal>
      <ContractModal>
        <div className='d-flex flex-row-reverse'>
          <Button
            className='mr-auto'
            name='Save'
            type='primary'
            onClick={saveEditContract}></Button>
          <Button className='mr-auto' name='Discard' type='secondary'></Button>
          <cancelContractButton />
        </div>
      </ContractModal>
    </div>
  );
};

export default ContractEditForm;
