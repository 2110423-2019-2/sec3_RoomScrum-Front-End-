import React, { useState, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Btn = styled.button`
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
  const onCancel = () => {
    //cancel by event Id
  };
  return (
    <div>
      <Btn className='btn' onclick={onCancel()}>
        <FontAwesomeIcon icon={faExclamationTriangle} /> cancel
      </Btn>
    </div>
  );
};

export default CancelContractButton;
