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
    console.log(application.event.contractStatus);
    const button =
      application.status == 'NotActive' ? (
        <></>
      ) : (
        <button onClick={viewContract}>view contract</button>
      );
    return button;
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
            <div className='col-9 grey' onClick={edit} onClick={edit}>
              <FontAwesomeIcon icon={faEdit} /> Edit my Contract
            </div>
          </div>
        </ContractModal>
        <ContractModal>
          <div className='d-flex flex-row-reverse'>
            <Button className='mr-auto' name='Send' type='primary'></Button>
          </div>
        </ContractModal>
      </Dialog>
      <Dialog
        isOpen={showContractEditFormDialog}
        onClose={() => setShowContractEditFormDialog(false)}>
        <ContractEditForm></ContractEditForm>
      </Dialog>
    </div>
  );
};

export default HireeContract;
