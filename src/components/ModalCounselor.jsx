// import axios from "axios";
// import moment from "moment";
// import React, { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const ModalCounselor = ({ show, handleClose, event, fetchAppointments }) => {
//   const modalRef = useRef();

//   const navigate = useNavigate();

//   const handleClickOutside = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       handleClose();
//     }
//   };

//   const handleButtonClick = () => {
//     window.open("http://localhost:3001/react-rtc", "_blank");
//   };

//   const handleCancelAppointment = async () => {
//     if (!event) return;

//     try {
//       const response = await axios.delete(
//         `http://localhost:5000/api/appointments/cancel/${event.id}`
//       );
//       if (response.status === 200) {
//         toast.success("Appointment canceled successfully");
//         fetchAppointments();
//         handleClose();
//       }
//     } catch (error) {
//       console.error("Error cancelling appointment:", error);
//       toast.error(
//         "Error cancelling appointment: " +
//           (error.response?.data?.message || error.message)
//       );
//     }
//   };

//   const showHideClassName = show ? "modal display-block" : "modal display-none";

//   return (
//     <div className={showHideClassName} onClick={handleClickOutside}>
//       <section className="modal-main" ref={modalRef}>
//         <h2>
//           {moment(event.start).format("dddd (h:mm a") +
//             " to " +
//             moment(event.end).format("h:mm a)")}
//         </h2>
//         <p>
//           <strong>With:</strong> {event.userName} ({event.userEmail})
//         </p>
//         <p>
//           <strong>Type:</strong> {event.sessionType}
//         </p>
//         <p>
//           <strong>Meeting code:</strong> Nm-23-rf6
//           <button className="copy-button">📋</button>
//         </p>
//         <div className="modal-buttons">
//           {event.isSessionStart ? (
//             <button
//               onClick={handleButtonClick}
//               type="button"
//               className="start-button"
//             >
//               Start Session
//             </button>
//           ) : (
//             <button type="button" className="start-button" disabled>
//               There is time for your session
//             </button>
//           )}
//           <button
//             type="button"
//             className="cancel-button"
//             onClick={handleCancelAppointment}
//           >
//             Cancel Session
//           </button>
//         </div>
//       </section>
//       <style jsx>{`
//         .modal {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background-color: rgba(0, 0, 0, 0.5);
//           opacity: 0;
//           animation: fadeIn 0.3s forwards;
//         }

//         .modal-main {
//           background: white;
//           padding: 20px;
//           border-radius: 10px;
//           width: 350px;
//           text-align: left;
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//           transform: translateY(-50px);
//           animation: slideIn 0.3s forwards;
//         }

//         .modal-main h2 {
//           font-size: 1.2rem;
//           margin-bottom: 10px;
//           color: #555;
//         }

//         .modal-main p {
//           margin-bottom: 10px;
//           font-size: 1rem;
//           color: #555;
//         }

//         .modal-main strong {
//           color: #333;
//         }

//         .copy-button {
//           background: none;
//           border: none;
//           cursor: pointer;
//           margin-left: 5px;
//           color: #333;
//         }

//         .modal-buttons {
//           display: flex;
//           justify-content: space-between;
//           margin-top: 20px;
//         }

//         .start-button {
//           padding: 10px 20px;
//           border: none;
//           background-color: #007bff;
//           color: white;
//           border-radius: 5px;
//           cursor: pointer;
//           font-size: 1rem;
//         }

//         .start-button:hover {
//           background-color: #0056b3;
//         }

//         .cancel-button {
//           padding: 10px 20px;
//           border: 1px solid #007bff;
//           background-color: white;
//           color: #007bff;
//           border-radius: 5px;
//           cursor: pointer;
//           font-size: 1rem;
//         }

//         .cancel-button:hover {
//           background-color: #e2e6ea;
//         }

//         .display-block {
//           display: flex;
//         }

//         .display-none {
//           display: none;
//         }

//         @keyframes fadeIn {
//           to {
//             opacity: 1;
//           }
//         }

//         @keyframes slideIn {
//           to {
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ModalCounselor;

import axios from "axios";
import moment from "moment";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ModalCounselor = ({ show, handleClose, event, fetchAppointments }) => {
  const modalRef = useRef();
  const [meetingCode, setMeetingCode] = useState(event.meetingCode || "");

  const navigate = useNavigate();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  const handleButtonClick = () => {
    window.open("http://localhost:3001/react-rtc", "_blank");
  };

  const handleCancelAppointment = async () => {
    if (!event) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/appointments/cancel/${event.id}`
      );
      if (response.status === 200) {
        toast.success("Appointment canceled successfully");
        fetchAppointments();
        handleClose();
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error(
        "Error cancelling appointment: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleUpdateMeetingCode = async () => {
    if (!event) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/api/appointments/update-meeting-code`,
        {
          appointmentId: event.id,
          meetingCode,
        }
      );
      if (response.status === 200) {
        toast.success("Meeting code updated successfully");
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error updating meeting code:", error);
      toast.error(
        "Error updating meeting code: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName} onClick={handleClickOutside}>
      <section className="modal-main" ref={modalRef}>
        <h2>
          {moment(event.start).format("dddd (h:mm a") +
            " to " +
            moment(event.end).format("h:mm a)")}
        </h2>
        <p>
          <strong>With:</strong> {event.userName} ({event.userEmail})
        </p>
        <p>
          <strong>Type:</strong> {event.sessionType}
        </p>
        <p>
          <strong>Meeting code:</strong>
          <input
            type="text"
            value={meetingCode}
            onChange={(e) => setMeetingCode(e.target.value)}
          />
          <button className="copy-button" onClick={handleUpdateMeetingCode}>
            Save
          </button>
        </p>
        <div className="modal-buttons">
          {event.isSessionStart ? (
            <button
              onClick={handleButtonClick}
              type="button"
              className="start-button"
            >
              Start Session
            </button>
          ) : (
            <button type="button" className="start-button" disabled>
              There is time for your session
            </button>
          )}
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancelAppointment}
          >
            Cancel Session
          </button>
        </div>
      </section>
      <style jsx>{`
        .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 0;
          animation: fadeIn 0.3s forwards;
        }

        .modal-main {
          background: white;
          padding: 20px;
          border-radius: 10px;
          width: 350px;
          text-align: left;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transform: translateY(-50px);
          animation: slideIn 0.3s forwards;
        }

        .modal-main h2 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #555;
        }

        .modal-main p {
          margin-bottom: 10px;
          font-size: 1rem;
          color: #555;
        }

        .modal-main strong {
          color: #333;
        }

        .copy-button {
          background: none;
          border: none;
          cursor: pointer;
          margin-left: 5px;
          color: #333;
        }

        .modal-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .start-button {
          padding: 10px 20px;
          border: none;
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }

        .start-button:hover {
          background-color: #0056b3;
        }

        .cancel-button {
          padding: 10px 20px;
          border: 1px solid #007bff;
          background-color: white;
          color: #007bff;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }

        .cancel-button:hover {
          background-color: #e2e6ea;
        }

        .display-block {
          display: flex;
        }

        .display-none {
          display: none;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ModalCounselor;
