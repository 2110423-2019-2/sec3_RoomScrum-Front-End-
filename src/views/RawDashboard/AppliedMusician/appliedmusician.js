import React from 'react';
import { Navbar } from 'src/components/common';
import { Link } from 'react-router-dom';

const Appliedmusician = () => {
  return (
      <div>
        <div>
          <Navbar/>
        </div>

 
        <div class='col-md-3 border border-primary' >
            <ul className="nav nav-pills nav-stacked justify-content-center ">
                <Link to='/eventinfo' className="active"><a href="#">Event Info</a></Link>
            </ul>
        </div>

        <div class='col-md-9  float-right border border-primary' >


            <h2 class='text-center font-weight-bold m-3'>Applied Musician</h2>
            <div className="container">
                    
              <table className="table table-striped ">
              <thead>
                <tr>
                  <th class="text-center ">Name</th>
                  <th class="text-center">Bio</th>
                  <th class="text-center ">Picture</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td >John</td>
                  <td >Praesent dapibus viverra metus id consectetur. Phasellus rhoncus et risus sit amet accumsan. Cras ut odio sodales, efficitur ligula nec, laoreet magna. In fermentum</td>
                  <img src="logo192.png" class="img-rounded float-right" ></img>
                  <button  class="btn btn-primary float-right" >View</button>
                </tr>
                <tr>
                  <td >Mary</td>
                  <td >Praesent dapibus viverra metus id consectetur. Phasellus rhoncus et risus sit amet accumsan. Cras ut odio sodales, efficitur ligula nec, laoreet magna. In fermentum</td>
                  <img src="logo192.png" class="img-rounded float-right" ></img>
                  <button  class="btn btn-primary float-right" >View</button>
                </tr>
                <tr>
                  <td >Bob</td>
                  <td >Praesent dapibus viverra metus id consectetur. Phasellus rhoncus et risus sit amet accumsan. Cras ut odio sodales, efficitur ligula nec, laoreet magna. In fermentum</td>
                  <img src="logo192.png" class="img-rounded float-right" ></img>
                  <button  class="btn btn-primary float-right" >View</button>
                </tr>
              </tbody>
              </table>
            </div>

        </div>
        
        <div class='col-md-3 border border-primary' >
            <ul className="nav nav-pills nav-stacked justify-content-center ">
                <Link to='/appliedmusician' className="active"><a href="#">Applied musician</a></Link>
            </ul>
        </div>


        <div class='col-md-3 border border-primary' >
            <ul className="nav nav-pills nav-stacked justify-content-center ">
                <Link to='/currentcontract' className="active"><a href="#">Current Contract</a></Link>
            </ul>
        </div>
      </div>

      

  );
  }
  
  export default Appliedmusician;