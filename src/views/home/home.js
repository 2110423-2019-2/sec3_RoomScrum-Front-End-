import React from "react";
import { Navbar } from "src/components/common";
import './home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div className="footer clearfix">
      <span className="copyright"> Copyright {'©'} 2021 www.finmus.com </span>
    </div>
  )
}

const Home = () => {
  return (
    <div className="full-height home">
      <Navbar />
      <div className="content">
        <img className="image-1" src="/sample-bg.jpg"/>
        <div className="headline">
          <div className="line-1">The best platform for</div>
          <div className="line-2">Musician {"&"} Organizer </div>
        </div>
        <div className="page-2">
          <img className="image-l" src="/sample-bg.jpg"/>
          <img className="image-r" src="/sample-bg-2.jpg"/>
          <div className="content">
            <div className="features"> 
              <FontAwesomeIcon icon={faCheckCircle}/>
              <span> Apply for events </span>
            </div>
            <div className="features"> 
              <FontAwesomeIcon icon={faCheckCircle}/>
              <span> Find musicians or band </span>
            </div>
            <div className="cta-buttons">
              <button> Register </button>
              <button> Login </button>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
