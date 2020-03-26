import React from 'react';
import { Navbar } from 'src/components/common';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    
    <div className="profile">

      <Navbar/>
    <Link to='/profile' className="active"><a href="#">Edit</a></Link>
    
      
      <h1> Profilenamokuy </h1>
      
    </div>
  );
}

export default Profile;