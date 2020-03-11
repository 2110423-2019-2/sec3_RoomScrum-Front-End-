import React from 'react';
import styled from 'styled-components';
import { useRouteMatch, Switch, Route, Link } from 'react-router-dom';
import {
  Button,
  Navbar,
  DashboardLayout,
  DashboardNavigation,
  DashboardContent
} from 'src/components/common';
import { SideNavigation } from 'src/components/common/sidebar/sidebar';

// const Button = styled.button`
//   background-color: white;
//   color: blue;
//   border: 2px solid blue;
//   ${props =>
//     props.primary &&
//     `
//     background-color: blue
//     color: white;
//   `}
// `;

const FadeBackground = styled.div`
  background-color: hsla(224, 46%, 11%, 0.65);
  /* width: 100%; */
  height: 97vh;
  padding-top: 3%;
`;

const ContractModal = styled.div`
  background-color: #fcfcfc;
  height: 90%;
  overflow: scroll;
  padding: 50px;
`;

const Test = () => {
  const match = useRouteMatch();
  return (
    <div>
      <Navbar />
      <DashboardLayout>
        <DashboardNavigation>
          <SideNavigation />
        </DashboardNavigation>
        <DashboardContent>
          <FadeBackground className='container-fluid'>
            <ContractModal className='container-sm'>
              <h1>Contract</h1>
              <div className='row'>
                <div className='col-2'>Contract status</div>
                <div className='col-10'>
                  <div></div> in review
                </div>
              </div>

              <div className='row'>
                <div className='col-2'>Event name</div>
                <div className='col-10'>SE night miniconcert</div>
              </div>

              <div className='row'>
                <div className='col-2'>Hirrer</div>
                <div className='col-10'>John Minian</div>
              </div>

              <div className='row'>
                <div className='col-2'>Hiree</div>
                <div className='col-10'>Little dog</div>
              </div>

              <div className='row'>
                <div className='col-2'>Budget</div>
                <div className='col-10'>20,500 baht</div>
              </div>

              <div className='row '>
                <div className='col-2'>Detail</div>
                <div className='col-10'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas vitae justo faucibus, faucibus erat ut, tempor arcu.
                  Vestibulum in enim augue. Nam in ante ex. Proin viverra
                  feugiat facilisis. Aliquam rutrum egestas fringilla. Curabitur
                  eget arcu luctus, malesuada enim maximus, rhoncus odio. Sed
                  consectetur leo sagittis tempor tempus. Etiam tempus. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
                  vitae justo faucibus, faucibus erat ut, tempor arcu.
                  Vestibulum in enim augue. Nam in ante ex. Proin viverra
                  feugiat facilisis. Aliquam rutrum egestas fringilla. Curabitur
                  eget arcu luctus, malesuada enim maximus, rhoncus odio. Sed
                  consectetur leo sagittis tempor tempus. Etiam tempus. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
                  vitae justo faucibus, faucibus erat ut, tempor arcu.
                </div>
              </div>
              <div className='d-flex flex-row justify-content-end'>
                <Button name='reject' type='danger'></Button>
                <Button
                  className='mr-auto'
                  name='accept'
                  type='primary'></Button>
              </div>
            </ContractModal>
          </FadeBackground>
        </DashboardContent>
      </DashboardLayout>
    </div>
  );
};

export default Test;
