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
import request from 'superagent';
import config from 'src/config';

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
const Btn = styled.button`
  min-width: 120px;
  height: 40px;
  margin-top:22px;
  margin-left: 22px;
  font-size:20px;
  border: none;
  color:white;
  background-color: #559be3;
    ${(props) => props.type == 'primary' && 'background-color:#559BE3'}
    ${(props) => props.type == 'secondary' && 'background-color:#939393'}
    ${(props) => props.type == 'danger' && 'background-color:#BA2B2B'};
`;

const HirerContract = ({ eventId, application }) => {
  const [showContractDialog, setShowContractDialog] = useState(false);

  const viewContract = ({}) => {
    // alert('viewContract');
    setShowContractDialog(true);
    return <div></div>;
  };

  // const edit = () => {
  //   alert('edit');
  // };

  const accept = () => {
    request
      .get(`${config.API_URL}/contract/accept/${eventId}`)
      .then((res) => {
        console.log(res);
        alert('accept complete');
        setShowContractDialog(false);
      })
      .catch((err) => {
        alert(err);
      });

    alert('accept');
  };
  const reject = () => {
    request
      .get(`${config.API_URL}/contract/reject/${eventId}`)
      .then((res) => {
        console.log(res);
        alert('reject complete');
        setShowContractDialog(false);
      })
      .catch((err) => {
        alert(err);
      });

    alert('reject');
  };

  return (
    <div>
      <button onClick={viewContract}>view contract</button>
      <Dialog
        isOpen={showContractDialog}
        onClose={() => setShowContractDialog(false)}>
        <Contract eventId={eventId} application={application}></Contract>
        <ContractModal>
          <div className='d-flex flex-row-reverse'>
            <Btn type='primary' onClick={accept}>
              accept
            </Btn>
            <Btn type='danger' onClick={reject}>
              reject
            </Btn>
          </div>
        </ContractModal>
      </Dialog>
    </div>
  );
};

export default HirerContract;
// <Button className='mr-auto' name='accept' type='primary'></Button>
// <Button name='reject' type='danger'></Button>
