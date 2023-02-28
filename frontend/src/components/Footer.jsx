import React from "react";
import BackButton from "./BackButton";

function Footer(props) {
  const currentYear = new Date().getFullYear();
  return props.isLoggedIn ? (
    <div className="footer-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <p>&copy; SSSIHL MDH {currentYear}</p>
          </div>
          <div className="col back">
            <BackButton />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="footer-container">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <p>&copy; SSSIHL MDH {currentYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
