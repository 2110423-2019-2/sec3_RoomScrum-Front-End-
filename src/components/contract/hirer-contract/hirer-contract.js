//hirer-contract จะประกอบไปด้วย
//1 ส่วน botton : view contract >> กดแล้วจะมี popup contract
//2 ส่วน popup ของ hiree-contract จะมีส่วนของ
//----------contract ปกติ
//----------ปุ่ม edit contract
import React, { useState, useRef } from 'react';
import Dialog from 'src/components/common/dialog';
import styled from 'styled-components';
import Contract from 'src/components/contract/contract';
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

const HirerContract = ({ eventId }) => {
  const [showContractDialog, setShowContractDialog] = useState(false);

  const viewContract = ({}) => {
    // alert('viewContract');
    setShowContractDialog(true);
    return <div></div>;
  };

  const edit = () => {
    alert('edit');
  };

  return (
    <div>
      <button onClick={viewContract}>view contract</button>
      <Dialog
        isOpen={showContractDialog}
        onClose={() => setShowContractDialog(false)}>
        <Contract eventId={eventId}></Contract>
        <ContractModal>
          <div className='d-flex flex-row-reverse'>
            <Button className='mr-auto' name='accept' type='primary'></Button>
            <Button name='reject' type='danger'></Button>
          </div>
        </ContractModal>
      </Dialog>
    </div>
  );
};

export default HirerContract;
