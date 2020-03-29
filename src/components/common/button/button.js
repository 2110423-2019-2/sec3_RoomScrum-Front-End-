import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  min-width: 120px;
  padding: 8px;
  font-size: 16px;
  border: none;
  color:white;
  background-color: #559be3;
  margin: 0 8px;
    ${props => props.type == 'primary' && 'background-color:#559BE3'}
    ${props => props.type == 'secondary' && 'background-color:#939393'}
    ${props => props.type == 'danger' && 'background-color:#BA2B2B'};
`;

const Button = ({ name, color, type, onClick }) => {
  return (
    <Btn onClick={onClick} type={type}>{name}</Btn>
  );
};

export default Button;
