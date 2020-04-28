import React, { useState } from "react";
import { Navbar } from "src/components/common";
import "./home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import LoginDialog from "src/components/login";
import { RoleGuard } from "src/components/common/guard";
import { observer } from "mobx-react";
import { globalLoginState } from "src/store/login-state";

const Footer = () => {
  return (
    <div className="footer clearfix">
      <span className="copyright"> Copyright {"©"} 2021 www.finmus.com </span>
    </div>
  );
};

const Home = observer(({ loginState }) => {
  const [showLogin, setShowLogin] = useState(false);

  const showLoginDialog = () => setShowLogin(true);
  const goRegister = () => (window.location.href = "register");

  return (
    <div className="full-height home">
      <Navbar />
      <div className="content">
        <img className="cover-image" src="/bg-1.png" />
        <div className="headline">
          <div className="line-1">The best platform for</div>
          <div className="line-2">Musician {"&"} Organizer </div>
        </div>
        <div className="page-2">
          <img className="cover-image bg-image" src="/bg-2.png" />
          <div className="content">
            <div className="features">
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> Apply for events </span>
            </div>
            <div className="features">
              <FontAwesomeIcon icon={faCheckCircle} />
              <span> Hire best musician </span>
            </div>

            {(() => {
              if (!loginState.isLoggedIn) {
                return (
                  <div className="cta-buttons">
                    <button onClick={goRegister}> Register </button>
                    <button onClick={showLoginDialog}> Login </button>
                  </div>
                );
              }
            })()}
          </div>
        </div>
        <Footer />
      </div>
      <LoginDialog
        open={showLogin}
        onRequestClose={() => setShowLogin(false)}
      />
    </div>
  );
});

export default () => <Home loginState={globalLoginState} />;
