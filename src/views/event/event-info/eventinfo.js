import React from 'react';
import { Navbar } from 'src/components/common';
import { Link } from 'react-router-dom';

const EventInfo = () => {
  return (
    <div>
        <div>
          <Navbar/>
            <div class='col-md-9  float-right border border-primary' >


                    <h2 class='text-center font-weight-bold m-3'>Event Info</h2>
                   
                         
                        <div class='row'>    
                            <div class="col-md-6">
                                <h5 class='ml-3'>Event Name</h5>
                                <p class='border border-primary ml-3'>Loren Ipsum</p>  
                            </div>
                            
                        </div>
                        <div class='col-md-3 float-right' >
                                <img src="logo192.png" class="img-rounded float-right" >
                                </img>

                                

                        </div>
                            
                        <div class='row'>
                            <div class="col-md-6">
                                <h5>Description</h5>
                                <p class='border border-primary '>
                                    
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida finibus neque, sit amet ornare eros tristique condimentum. Quisque egestas a risus vitae lacinia. Cras quam arcu, pretium eget semper vitae, malesuada at dui. Donec volutpat nunc mauris, id varius mauris aliquam vel. Duis scelerisque purus nec feugiat pellentesque. Vestibulum efficitur libero in nunc dapibus laoreet. Donec quis ex id nisl convallis luctus nec sit amet dui. Nunc eu mi ultricies, interdum dui ac, auctor magna. Quisque pretium magna accumsan metus aliquet, in mollis mi aliquam.
                                
                                </p>  
                            </div>
                        </div>
                        <div class = 'row'>
                            <div class="col-md-6">
                                <h5 class='ml-3'>Address</h5>
                                <p class='border border-primary ml-3'>Curabitur</p>  
                            </div>
                        </div>

                        <div class='row'>
                            <div class="col-md-6">
                                <h5 class='ml-3'>Sub District</h5>
                                <p class='border border-primary ml-3'>Donec efficitur</p>  
                            </div>
                        
                            <div class="col-md-6">
                                <h5>District</h5>
                                <p class='border border-primary'>Iaculis</p>  
                            </div>
                        </div>
                        <div class='row'>
                            <div class="col-md-6">
                                <h5 class='ml-3'>City State</h5>
                                <p class='border border-primary ml-3'>Etiam scelerisque</p>  
                            </div>
                        
                            <div class="col-md-6">
                                <h5>Country</h5>
                                <p class='border border-primary'>Suspendisse</p>  
                            </div>
                        </div>
                        <div class='row'>
                            <div class="col-md-6">
                                    <h5 class='ml-3'>Zip Code</h5>
                                    <p class='border border-primary ml-3'>99999</p>  
                            </div>
                        </div>
                        <div class='row'>
                            <div class="col-md-6 ">
                                    <h5 class='ml-3'>Start Date Time</h5>
                                    <p class='border border-primary ml-3'>99/99/99 99:99</p>  
                            </div>
                            <div class="col-md-6">
                                    <h5>End Date Time</h5>
                                    <p class='border border-primary'>99/99/99 99:99</p>  
                            </div>
                        </div>
                        <div class='row mt-3'>
                        
                            <div class="col-md-1">
                                    <Link class='border border-primary'>Pulvina</Link>  
                            </div>
                            <div class="col-md-1">
                                    <Link class='border border-primary'>Pulvina</Link>  
                            </div>
                            <div class="col-md-1">
                                    <p class='border border-primary'>Pulvina</p>  
                            </div>
                            <div class="col-md-1">
                                    <p class='border border-primary'>Pulvina</p>  
                            </div>
                            <div class="col-md-1">
                                    <p class='border border-primary'>Pulvina</p>  
                            </div>
                        </div>
                        <button  class="btn btn-primary m-5 float-right" >Edit Info</button>
                     
                        


                   

                    
                </div>

            </div>


            <div class='col-md-3 border border-primary' >
                <ul className="nav nav-pills nav-stacked justify-content-center ">
                    <Link to='/event/info/1' className="active"><a href="#">Event Info</a></Link>
                </ul>
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

export default EventInfo;