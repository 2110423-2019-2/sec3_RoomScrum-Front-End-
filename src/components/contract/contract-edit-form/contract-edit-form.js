import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import request from 'superagent';
import config from 'src/config';
import { Button } from 'src/components/common';
import cancelContractButton from '../cancel-contract-button';
import { ContractStatusIndicator } from 'src/components/event-item/status-indicator/status-indicator';

const InputField = React.forwardRef(
  ({ name, type, place, isTextarea, callback }, ref) => {
    const [value, setValue] = useState(place);
    const handleChange = (event) => {
      setValue(event.target.value);
      callback(event.target.value);
      // if (type == 'number') {
      //   try {

      //   } catch {}
      // }
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

  const [budgetInput, setBudgetInput] = useState(application.contract);
  const [detailInput, setDetailInput] = useState(null);
  const [err, setErr] = useState('-');
  function updateErr() {
    console.log(budgetInput);
    console.log(detailInput);
    var e = [];
    if (budgetInput == null || budgetInput == '') {
      e.push('Price is required');
    }
    if (budgetInput == NaN) {
      e.push('Price must be a number');
    }

    if (budgetInput != null && budgetInput < 0) {
      e.push('Price must be positive');
    }

    if (detailInput == '') {
      e.push('Description is required');
    }
    console.log(e);
    if (e.length == 0) {
      setErr('');
    } else {
      setErr(e.join());
    }
    // console.log(err.join());
  }
  const updateBudget = (value) => {
    if (value == '') {
    } else {
      setBudgetInput(Number(value));
    }
    // console.log(`update budget:${value}`);
    updateErr();
  };

  const updateDetail = (value) => {
    setDetailInput(value);
    // console.log(`updescription:${value}`);
    updateErr();
  };
  // const sendContract = () => {
  //   request
  //     .get(`${config.API_URL}/contract/send/${eventId}`) // get my applications, with event detail
  //     .withCredentials()
  //     .then((res) => {
  //       console.log('sendComplete');
  //     })
  //     .catch((err) => {
  //       alert('Error getting when send events ');
  //       console.error('Error: Fetch applied events');
  //     });
  // };
  // console.log(typeof setBudgetInput);

  const saveEditContract = () => {
    console.log(`budget:${budgetInput}`);
    console.log(`detail:${detailInput}`);
    request
      .post(`${config.API_URL}/contract/${eventId}`) // get my applications, with event detail
      .send({
        eventId: eventId,
        price: budgetInput,
        description: detailInput,
      })
      .withCredentials()
      .then((res) => {
        console.log('save contract complete');
        request
          .get(`${config.API_URL}/contract/send/${eventId}`) // get my applications, with event detail
          .withCredentials()
          .then((res) => {
            console.log('sendComplete');
          })
          .catch((err) => {
            alert('Error getting applied events when send');
            console.error('Error: Fetch applied events');
          });
      })
      .catch((err) => {
        alert('Error getting applied events when save ');
        console.error('Error: Fetch applied events');
      });
  };

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
            <InputField
              name='budget'
              type='text'
              text={price}
              place={price}
              callback={updateBudget}
            />
          </div>
        </div>
        <div className='row '>
          <div className='label col-3'>Detail</div>
          <div className='col-9'>
            <InputField
              name='detail'
              type='text'
              text={price}
              place={contract.description || '-'}
              isTextarea
              callback={updateDetail}
            />
          </div>
        </div>
        <div className='row '>
          <div className='label col-3'></div>
          <div className='col-9'>{err}</div>
        </div>
      </ContractModal>
      <ContractModal>
        <div className='d-flex flex-row-reverse'>
          <Button
            className='mr-auto'
            name='Save & Send'
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
