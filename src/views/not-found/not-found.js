import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Navbar } from "../../components/common";

const NotFoundPage = () => {
  const match = useRouteMatch();
  return (
    <div>
      <Navbar />
      <h1> 404 Not found </h1>
      <p> url is invalid </p>
      <p> {JSON.stringify(match)}</p>
    </div>
  );
};

export default NotFoundPage;
