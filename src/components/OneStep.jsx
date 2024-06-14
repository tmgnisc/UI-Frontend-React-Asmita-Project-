import { faLock, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import image from "../images/Group 122.png";

const OneStep = () => {
  return (
    <div className="one-step-section">
      <div className="image-container">
        <img
          src={image}
          alt="One step"
          className="one-step-image"
        />
      </div>
      <div className="text-container">
        <h2>One Step At A Time</h2>
        {/* <p>
          Experience personalized support and professional guidance with our
          mental health counseling apps, designed to help you achieve emotional
          well-being and resilience.
        </p> */}
        <div className="card-container">
          <div className="card">
            <div className="card-content">
              <FontAwesomeIcon icon={faLock} className="icon" />
              <h3>Confidentiality</h3>
              <p>
                With top-notch security measures, our system guarantees the
                confidentiality of your information.
              </p>
            </div>
          </div>
          <div className="card">
            <FontAwesomeIcon icon={faShieldAlt} className="icon" />
            <div className="card-content">
              <h3>Accessibility</h3>
              <p>
                The system allows you to connect with professional support
                anytime, anywhere, right from your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneStep;
