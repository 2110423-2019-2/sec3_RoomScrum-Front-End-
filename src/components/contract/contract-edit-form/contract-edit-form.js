import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import request from 'superagent';
import config from 'src/config';
import { Button } from 'src/components/common';
import { ConfirmButton } from 'src/components/action-buttons/base/confirm-button';

import cancelContractButton from '../cancel-contract-button';
import { ContractStatusIndicator } from 'src/components/event-item/status-indicator/status-indicator';

const InputField = React.forwardRef(
  ({ name, type, place, isTextarea, callback, err }, ref) => {
    const [value, setValue] = useState(place);
    const handleChange = (event) => {
      setValue(event.target.value);
      callback(event.target.value);
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
            {!(err == '' || err == undefined) && (
              <div className='text-danger'>*{err}</div>
            )}
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
          {!(err == '' || err == undefined) && (
            <div className='text-danger'>*{err}</div>
          )}
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

const ContractEditForm = ({ application, discardAllChanges }) => {
  //oil-ข้อมูลที่ได้จากการเอา eventId มา get contract todo-start
  // const [hiree, setHiree] = useState('-');
  // console.log(application);
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
  const [detailInput, setDetailInput] = useState();
  const [budgetError, setBudgetError] = useState();
  const [descriptionError, setDescriptionError] = useState();

  const updateBudget = (value) => {
    setBudgetError('');
    if (value == '') {
      console.log('budget is empty');
      setBudgetError('Price is required. ');
    } else {
      console.log('[correct] budget is not empty');
      if (isNaN(value)) {
        console.log('Price must be a number');
        setBudgetError('Price must be a number. ');
      } else {
        console.log('[correct] budget is number and not empty');
        if (value < 0) {
          console.log('Price must be positive');
          setBudgetError('Price must be positive. ');
        } else {
          setBudgetError('');
          console.log('correctInput');
          setBudgetInput(Number(value));
        }
      }
    }
  };

  const updateDetail = (value) => {
    setDescriptionError('');
    if (value == '') {
      setDescriptionError('Description is required.');
    } else {
      setDescriptionError('');
    }
    setDetailInput(value);
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
  function checkError() {
    console.log(budgetError !== '' && descriptionError !== '');
    return budgetError !== '' && descriptionError !== '';
  }

  const saveEditContract = () => {
    console.log(budgetInput);
    console.log(detailInput);
    const hasError = checkError();
    if (hasError) {
      var e = '';
      if (budgetError != undefined) {
        e += budgetError;
      }
      if (descriptionError != undefined) {
        e += descriptionError;
      }
      alert(e);
      if (budgetError == '') {
        console.log(`budgetError == ''`);
      }
      if (descriptionError == '') {
        console.log(`descriptionError == ''`);
      }
    } else {
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
              window.location.href = '/musician/my-events';
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
    }
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
          <div className='col-9'>
            {application.event.contract.hiree.firstName}{' '}
            {application.event.contract.hiree.lastName}
          </div>
        </div>
        <div className='row'>
          <div className='label col-3'>Budget</div>
          <div className='col-9'>
            <InputField
              name='budget'
              type='text'
              text={price}
              place={application.event.contract.price}
              callback={updateBudget}
              err={budgetError}
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
              err={descriptionError}
            />
          </div>
        </div>
      </ContractModal>
      <ContractModal>
        <div className='d-flex flex-row-reverse'>
          <ConfirmButton
            children={
              <Button
                className='mr-auto'
                name='Save & Send'
                type='primary'></Button>
            }
            action={saveEditContract}
            title={'Confrimation'}
            question={`Please confirm to save and send. This process can't be undone `}
          />
          <ConfirmButton
            children={
              <Button
                className='mr-auto'
                name='Discard'
                type='secondary'></Button>
            }
            action={discardAllChanges}
            title={'Confrimation'}
            question={`Please confirm to discard all changes. This process can't be undone `}
          />
          <cancelContractButton />
        </div>
      </ContractModal>
    </div>
  );
};

export default ContractEditForm;
