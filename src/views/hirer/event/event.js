import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import "./event.scss";
import request from "superagent";
import config from "src/config";
import HirerDashboard from "src/views/hirer-dashboard/hirer-dashboard"

export default () => {
  // const match = useRouteMatch();
  // const { url } = match;
  // console.log(match);

  // const [open, setOpen] = useState(false);

  // const [musicians, setMusician] = useState(null);
  // const [shownMusician, setShownMusician] = useState(null);
  // if (musicians === null) {
  //   request
  //     .get(`${config.API_URL}/admin/user/unapproved`)
  //     // request.get('http://localhost:3003/users')
  //     .then(res => {
  //       setMusician(JSON.parse(res.text));
  //     })
  //     .catch(err => {
  //       console.error("error fetching user", err);
  //       alert("Error fetching musicians");
  //     });
  // }

  // const removeShownMusician = () => {
  //   setMusician(musicians.filter(m => m != shownMusician));
  // };
  return (
    <div> 
      <HirerDashboard/>
    </div>
  );
};
