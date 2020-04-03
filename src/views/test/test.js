import React from 'react';
import styled from 'styled-components';
import { useRouteMatch, Switch, Route, Link } from 'react-router-dom';
import {
  Button,
  BackBotton,
  Navbar,
  DashboardLayout,
  DashboardNavigation,
  DashboardContent
} from 'src/components/common';
import SideNavigation from 'src/components/common/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faEdit } from '@fortawesome/free-solid-svg-icons';

const FadeBackground = styled.div`
  background-color: hsla(224, 46%, 11%, 0.65);
  height: 97vh;
  padding-top: 3%;
  color: #303e61;
  font-size: 20px;
  h1 {
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    color: #364d9b;
  }
  .label {
    font-weight: bold;
    color: #303e61;
  }
  .status-color {
    width: 15px;
    height: 11px;
    background-color: #ecbf4d;
    display: inline-block;
    margin-right: 10px;
  }
`;

const ContractModal = styled.div`
  background-color: #fcfcfc;
  height: 90%;
  overflow: scroll;
  padding: 50px;
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

const Test = () => {
  // const match = useRouteMatch();
  const status = 'in review';
  const eventName = 'SE night miniconcert';
  const hirer = 'John Minian';
  const hiree = 'Little dog';
  const budget = '20,500 baht';
  const descritpion =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenasvitae justo faucibus, faucibus erat ut, tempor arcu. Vestibulum inenim augue. Nam in ante ex. Proin viverra feugiat facilisis. Aliquamrutrum egestas fringilla. Curabitur eget arcu luctus, malesuada enimmaximus, rhoncus odio. Sed consectetur leo sagittis tempor tempus.Etiam tempus. Lorem ipsum dolor sit amet, consectetur adipiscingelit. Maecenas vitae justo faucibus, faucibus erat ut, tempor arcu.Vestibulum in enim augue. Nam in ante ex. Proin viverra feugiatfacilisis. Aliquam rutrum egestas fringilla. Curabitur eget arculuctus, malesuada enim maximus, rhoncus odio. Sed consectetur leosagittis tempor tempus. Etiam tempus. Lorem ipsum dolor sit amet,consectetur adipiscing elit. Maecenas vitae justo faucibus, faucibuserat ut, tempor arcu.';

  const edit = () => {
    alert('edit');
  };

  return (
    <div>
      <ContractModal className='container-sm position-relative'>
        <h1>Contract</h1>
        <br />
        <div className='row'>
          <div className='label col-3'>Contract status</div>
          <div className='col-9'>
            <div className='status-color'>{status}</div>
          </div>
        </div>
        <div className='row'>
          <div className='label col-3'>Event name</div>
          <div className='col-9'>{eventName}</div>
        </div>
        <div className='row'>
          <div className='label col-3'>Hirrer</div>
          <div className='col-9'>{hirer}</div>
        </div>
        <div className='row'>
          <div className='label col-3'>Hiree</div>
          <div className='col-9'>{hiree}</div>
        </div>
        <div className='row'>
          <div className='label col-3'>Budget</div>
          <div className='col-9'>{budget}</div>
        </div>
        <div className='row '>
          <div className='label col-3'>Detail</div>
          <div className='col-9'>{descritpion}</div>
        </div>
        <br></br>
        <div className='row '>
          <div className='label col-3'></div>
          <div className='col-9 grey' onClick={edit}>
            <FontAwesomeIcon icon={faEdit} /> Edit my Contract
          </div>
        </div>
        {/**<div className='row position-absolute'>
          <Button name='reject' type='danger'></Button>
          <Button className='mr-auto' name='accept' type='primary'></Button>
  </div>*/}
      </ContractModal>
    </div>
  );
};

export default Test;
