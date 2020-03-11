import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Navbar } from '../../components/common';

const Test = () => {
  const match = useRouteMatch();
  return (
    <div>
      <Navbar />
      <h1> Test page </h1>
      <p> สู้ ๆ นะทุกคน </p>
      <p> {JSON.stringify(match)}</p>
    </div>
  );
};

export default Test;
