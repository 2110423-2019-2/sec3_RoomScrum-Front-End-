import React from 'react';
import {
  calculateHireeEventColor,
  calculateHireeEventStatus,
  calculateHirerEventStatus,
  calculateHirerEventColor,
} from './event-status';
import styled from 'styled-components';
import {
  calculatePaymentColor,
  calculatePaymentStatus,
} from './payment-status';
import {
  calculateContractColor,
  calculateContractStatus,
} from './contract-status';
const toColor = (colorName) => {
  switch (colorName) {
    case 'green':
      return '#94bc53';
    case 'yellow':
      return '#ecbf4d';
    case 'grey':
      return '#adadad';
    case 'red':
      return '#c62727';
    case 'blue':
      return '#69bed9';
    default:
      return colorName;
  }
};

const _IndicatorBlock = styled.div`
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 8px;
  background-color: ${(props) => toColor(props.color)};
`;

export const IndicatorBlock = ({ color }) => {
  return <_IndicatorBlock color={color} />;
};

const StatusIndicator = ({ color, text }) => {
  return (
    <div className='status-indicator'>
      <IndicatorBlock color={color} />
      {text}
    </div>
  );
};

export const HireeEventStatusIndicator = ({
  eventStatus,
  applicationStatus,
}) => {
  return (
    <StatusIndicator
      color={calculateHireeEventColor(eventStatus, applicationStatus)}
      text={calculateHireeEventStatus(eventStatus, applicationStatus)}
    />
  );
};

export const HirerEventStatusIndicator = ({
  eventStatus,
  applicationStatus,
}) => {
  return (
    <StatusIndicator
      color={calculateHirerEventColor(eventStatus, applicationStatus)}
      text={calculateHirerEventStatus(eventStatus, applicationStatus)}
    />
  );
};

export const ContractStatusIndicator = ({ contractStatus }) => {
  return (
    <StatusIndicator
      color={calculateContractColor(contractStatus)}
      text={calculateContractStatus(contractStatus)}
    />
  );
};

export const PaymentStatusIndicator = ({ eventStatus }) => {
  return (
    <StatusIndicator
      color={calculatePaymentColor(eventStatus)}
      text={calculatePaymentStatus(eventStatus)}
    />
  );
};
