import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import request from 'superagent';
import config from 'src/config';
import {
  HireeEventStatusIndicator,
  PaymentStatusIndicator,
  ContractStatusIndicator,
  ContractStatusColorIndicator,
} from 'src/components/event-item/status-indicator/status-indicator';
import {
  calculateHireeEventColor,
  calculateHireeEventStatus,
  calculateHirerEventStatus,
  calculateHirerEventColor,
} from 'src/components/event-item/status-indicator/status-indicator';

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
`;

const Contract = ({ application }) => {
  // const [contractInfo, setContractInfo] = useState();
  // const [isFetch, setIsFetch] = useState(false);
  console.log(application);

  const {
    contract: contract,
    event: {
      eventName,
      eventId,
      district,
      province,
      userId: hirerId,
      user: {
        // hirer
        firstName: hirerFirstName,
        lastName: hirerLastName,
      },
    },
  } = application;

  console.log(application.event.user);

  return (
    <div>
      <ContractModal className='container-sm position-relative'>
        <h1>Contract</h1>
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
            {application.contract.hiree.firstName}
            {application.contract.hiree.lastName}
          </div>
        </div>
        <div className='row'>
          <div className='label col-3'>Budget</div>
          {(() => {
            try {
              return (
                <div className='col-9'>
                  {application.contract.price.toLocaleString()}
                </div>
              );
            } catch {
              return <div className='col-9'>-</div>;
            }
          })()}
        </div>
        <div className='row '>
          <div className='label col-3'>Detail</div>
          <div className='col-9'>{contract.description || '-'}</div>
        </div>
      </ContractModal>
    </div>
  );
};

export default Contract;
