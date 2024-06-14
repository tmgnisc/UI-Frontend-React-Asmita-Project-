import { faLock, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import image from "../images/Rectangle 6.png";

const MentalHealthSection = () => {
  return (
    <div className="mental-health-section">
      <div className="image-container">
        <img
          src={image}
          alt="Counselling session"
          className="counselling-image"
        />
      </div>
      <div className="text-container">
        <h2>You Deserve To Be Mentally Happy</h2>
        <p>
          Experience personalized support and professional guidance with our
          mental health counseling apps, designed to help you achieve emotional
          well-being and resilience.
        </p>
        <button className="get-started-btn">Get Started</button>
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

export default MentalHealthSection;
