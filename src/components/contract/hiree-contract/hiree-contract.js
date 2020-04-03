//hiree-contract จะประกอบไปด้วย
//1 ส่วน botton : view contract >> กดแล้วจะมี popup contract
//2 ส่วน popup ของ hiree-contract จะมีส่วนของ
//----------contract ปกติ
//----------ปุ่ม edit contract
//3 ส่วน popup ของ edit-contract

import React, { useState, useRef, useCallback } from 'react';
import './hiree-contract.scss';
import Dialog from 'src/components/common/dialog';
import styled from 'styled-components';
import Contract from 'src/components/contract/contract';
import ContractEditForm from 'src/components/contract/contract-edit-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'src/components/common';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import CancelContractButton from 'src/components/contract/cancel-contract-button';
import request from 'superagent';
import config from 'src/config';

const Btn = styled.button`
  min-width: 120px;
  height: 40px;
  margin-top:22px;
  margin-left: 22px;
  font-size:20px;
  border: none;
  color:white;
  background-color: #559be3;
    ${props => props.type == 'primary' && 'background-color:#559BE3'}
    ${props => props.type == 'secondary' && 'background-color:#939393'}
    ${props => props.type == 'danger' && 'background-color:#BA2B2B'};
`;

const BtnCancel = styled.button`
  margin-top: 32px;
  font-size: 16px;
  border: none;
  color: #939393;
  padding: 0px;
  .btn:hover {
    color: #ba2b2b;
  }
`;

const ContractModal = styled.div`
  background-color: #fcfcfc;
  overflow: scroll;
  padding: 50px;
  padding-top: 0px;
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

const HireeContract = ({ eventId, application }) => {
  const [showContractDialog, setShowContractDialog] = useState(false);
  const [showContractEditFormDialog, setShowContractEditFormDialog] = useState(
    false
  );

  const viewContract = ({}) => {
    setShowContractDialog(true);
    return <div></div>;
  };

  const viewEditContract = ({}) => {
    setShowContractEditFormDialog(true);
  };

  const edit = () => {
    //alert('edit' + eventId);
    setShowContractDialog(false);
    setShowContractEditFormDialog(true);
    // console.log(eventId);
  };
  const ViewContractButton = () => {
    //
    //
    // console.log(application.event.contractStatus);
    const button =
      application.status == 'NotActive' ? (
        <></>
      ) : (
        <button onClick={viewContract}>view contract</button>
      );
    return button;
  };

  const send = () => {
    request
      .get(`${config.API_URL}/contract/send/${eventId}`)
      .withCredentials()
      .then(res => {
        console.log(res);
        alert('send complete');
        setShowContractDialog(false);
      })
      .catch(err => {
        alert(err);
      });

    // alert('send');
  };

  const cancelContract = () => {
    request
      .get(`${config.API_URL}/contract/cancel/${eventId}`)
      .withCredentials()
      .then(res => {
        console.log(res);
        alert('cancel complete');
        setShowContractDialog(false);
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <div>
      {/**
        <button onClick={viewContract}>view contract</button>
      */}
      <ViewContractButton />
      <Dialog
        isOpen={showContractDialog}
        onClose={() => setShowContractDialog(false)}>
        <Contract eventId={eventId}></Contract>
        <ContractModal>
          <div className='row '>
            <div className='label col-3'></div>
            <div className='col-9 grey'>
              <div onClick={edit}>
                <FontAwesomeIcon icon={faEdit} /> Edit my Contract
              </div>
            </div>
          </div>
        </ContractModal>
        <ContractModal>
          <div className='row '>
            <div className='label col-3'>
              <BtnCancel className='btn' onClick={cancelContract}>
                <FontAwesomeIcon icon={faExclamationTriangle} /> cancel
              </BtnCancel>
            </div>
            <div className='col-9 grey'>
              <div className='d-flex flex-row-reverse'>
                <Btn type='primary' onClick={send}>
                  send
                </Btn>
              </div>
            </div>
          </div>
        </ContractModal>
      </Dialog>
      <Dialog
        isOpen={showContractEditFormDialog}
        onClose={() => setShowContractEditFormDialog(false)}>
        <ContractEditForm eventId={eventId}></ContractEditForm>
      </Dialog>
    </div>
  );
};

export default HireeContract;