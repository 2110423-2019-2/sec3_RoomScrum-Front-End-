import React from 'react';
import styled from 'styled-components';

import { useRouteMatch, Switch, Route, Link } from 'react-router-dom';
import {
  Navbar,
  DashboardLayout,
  DashboardNavigation,
  DashboardContent
} from 'src/components/common';
import { SideNavigation } from 'src/components/common/sidebar/sidebar';

const Button = styled.button`
  background-color: white;
  color: blue;
  border: 2px solid blue;
  ${props =>
    props.primary &&
    `
    background-color: blue
    color: white;
  `}
`;

const ContractModal = styled.div`
  background-color: pink;
  width: 40px;
  height: 100px;
`;

const Test = () => {
  const match = useRouteMatch();
  return (
    <div>
      <Navbar />
      <ContractModal></ContractModal>
      <h1> Test page </h1>
      <p> สู้ ๆ นะทุกคน </p>
      <Button onClick={() => alert('This is Normal Button')}>
        Normal Button
      </Button>
      <Button primary onClick={() => alert('This is Primary Button')}>
        Primary Button
      </Button>
      <Navbar />
      <DashboardLayout>
        <DashboardNavigation>
          <SideNavigation />
        </DashboardNavigation>
        <DashboardContent></DashboardContent>
      </DashboardLayout>
    </div>
  );
};

export default Test;
