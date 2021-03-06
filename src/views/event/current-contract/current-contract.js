import React from "react";
import { Navbar } from "src/components/common";
import { Link } from "react-router-dom";

const Currentcontract = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div class="col-md-3 border border-primary">
        <ul className="nav nav-pills nav-stacked justify-content-center ">
          <Link to="/eventinfo" className="active">
            <a href="#">Event Info</a>
          </Link>
        </ul>
      </div>

      <div class="col-md-3 border border-primary">
        <ul className="nav nav-pills nav-stacked justify-content-center ">
          <Link to="/appliedmusician" className="active">
            <a href="#">Applied musician</a>
          </Link>
        </ul>
      </div>

      <div class="col-md-9  float-right border border-primary">
        <h2 class="text-center font-weight-bold m-3">Current Contract</h2>
        <p class="text-center h-100">Contract</p>
        <p class="text-center h-100">Contract</p>
        <p class="text-center h-100">Contract</p>
        <p class="text-center h-100">Contract</p>
        <p class="text-center h-100">Contract</p>

        <p class="text-center h-100">Contract</p>
        <p class="text-center h-100">Contract</p>
        <p class="text-center h-100">Contract</p>
        <p class="text-center h-100">Contract</p>
      </div>

      <div class="col-md-3 border border-primary">
        <ul className="nav nav-pills nav-stacked justify-content-center ">
          <Link to="/currentcontract" className="active">
            <a href="#">Current Contract</a>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Currentcontract;
