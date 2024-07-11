import React from "react";
import qr from "../images/qr.png"
const QRCodeComponent = ({ qrImage, onDone }) => {
  return (
    <div className="qr-container">
      <p>Please scan the following QR to complete your booking procedure:</p>
      <img src={qr} alt="QR Code" className="qr-image" />
      <p>
        In case of any issues, you may be asked to provide the booking
        confirmation statement.
      </p>
      <button onClick={onDone} className="done-button">
        Done →
      </button>

      <style jsx>{`
        .qr-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
          max-width: 400px;
          margin: 0 auto;
          background-color: #fff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .qr-image {
          margin: 20px 0;
          width: 200px;
          height: 200px;
        }

        .done-button {
          color: black;
          padding: 5px 20px;
          border: 1px solid #000;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }

        .done-button:hover {
          background-color: #b2d5f5;
          border: none;
          color: white;
        }

        .done-button:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default QRCodeComponent;
