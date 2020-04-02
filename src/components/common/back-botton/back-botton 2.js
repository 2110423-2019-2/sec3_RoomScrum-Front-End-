import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Back = styled.button`
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

const BackBotton = ({ name, color, type }) => {
  return (
    <div
      className='position-absolute align-middle'
      style={{ bottom: '50px', left: '52px', color: '#939393' }}>
      <FontAwesomeIcon icon={faChevronLeft} style={{ marginRight: 10 }} />
      Back
    </div>
  );
};

export default BackBotton;
