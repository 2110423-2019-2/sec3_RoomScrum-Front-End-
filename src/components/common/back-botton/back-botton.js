import React from 'react';
import styled from 'styled-components';

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

const BackBotton = ({ name, color, type }) => {
  return (
    <div>
      <Btn type={type}>{name}</Btn>
    </div>
  );
};

export default BackBotton;
