import React, { useState, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

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

const CancelContractButton = eventId => {
  const cancelContract = () => {
    //cancel by event Id
    alert(eventId);
  };
  return (
    <div>
      <BtnCancel className='btn'>
        <FontAwesomeIcon icon={faExclamationTriangle} /> cancel
      </BtnCancel>
    </div>
  );
};

export default CancelContractButton;
