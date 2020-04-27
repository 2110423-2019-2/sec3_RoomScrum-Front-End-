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
import { ConfirmButton } from 'src/components/action-buttons/base/confirm-button';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ContractModal = styled.div`
  background-color: #fcfcfc;
  overflow: scroll;
  padding: 50px;
  padding-top: 0px;
  margin-top: -1px;
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
    setShowContractDialog(true);
    return <div></div>;
  };

  const cancelContract = () => {
    request
      .get(`${config.API_URL}/contract/cancel/${eventId}`)
      .withCredentials()
      .then((res) => {
        console.log(res);
        // alert('cancel complete');
        setShowContractDialog(false);
        window.location.href = '/hirer/event';
      })
      .catch((err) => {
        alert(err);
      });
  };

  const accept = () => {
    request
      .get(`${config.API_URL}/contract/accept/${eventId}`)
      .withCredentials()
      .then((res) => {
        console.log(res);
        // alert('accept complete');
        setShowContractDialog(false);
        window.location.href = '/hirer/event';
      })
      .catch((err) => {
        alert(err);
      });

    // alert('accept');
  };
  const reject = () => {
    request
      .get(`${config.API_URL}/contract/reject/${eventId}`)
      .withCredentials()
      .then((res) => {
        console.log(res);
        // alert('reject complete');
        setShowContractDialog(false);
        window.location.href = '/hirer/event';
      })
      .catch((err) => {
        alert(err);
      });

    // alert('reject');
  };
  console.log(application.contract);
  return (
    <div>
      {(() => {
        return application.contract == 'NotActive' ? null : (
          <Button name='View contract' onClick={viewContract}></Button>
        );
      })()}
      <Dialog
        isOpen={showContractDialog}
        onClose={() => setShowContractDialog(false)}>
        {(() => {
          console.log(application);
        })()
        //<Contract eventId={eventId} application={application}></Contract>
        }
        <Contract eventId={eventId} application={application}></Contract>

        <ContractModal>
          <div className='row'>
            <div className='col-12'>
              {(() => {
                const status = application.contract.status;
                const hideFor = [
                  'Accepted',
                  'WaitForStartDrafting',
                  'Rejected',
                ];
                return (
                  !hideFor.includes(status) && (
                    <div>
                      <ConfirmButton
                        children={
                          <Btn type='primary' className='float-right'>
                            Accept
                          </Btn>
                        }
                        action={accept}
                        title={'Confirmation'}
                        question={`Please confirm to accept this contract. The process can't be undone.`}
                      />
                      <ConfirmButton
                        children={
                          <Btn type='danger' className='float-right'>
                            Reject
                          </Btn>
                        }
                        action={reject}
                        title={'Confirmation'}
                        question={`Please confirm to reject this contract. The process can't be undone.`}
                      />
                    </div>
                  )
                );
              })()}
              {(() => {
                const status = application.contract.status;
                const hideFor = ['Accepted', 'WaitForStartDrafting'];
                return (
                  !hideFor.includes(status) && (
                    <ConfirmButton
                      children={
                        <Btn type='danger' className='float-right'>
                          Cancel
                        </Btn>
                      }
                      action={cancelContract}
                      title={'Confirmation'}
                      question={`Please confirm to cancel this contract. The process can't be undone.`}
                    />
                  )

                  // )
                );
              })()}
            </div>
          </div>
        </ContractModal>
      </Dialog>
    </div>
  );
};

export default HirerContract;
// <Button className='mr-auto' name='accept' type='primary'></Button>
// <Button name='reject' type='danger'></Button>
