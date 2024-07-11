import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toast } from "react-toastify";
import AnimatedWave from "../components/AnimatedWave";
import ModalCounselor from "../components/ModalCounselor"; // Ensure the correct import path

const localizer = momentLocalizer(moment);

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#fff",
    position: "fixed",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "all 0.3s ease-in-out",
  },
  calendar: {
    height: "700px",
    width: "100%",
    margin: "20px 0",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  legend: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    marginRight: "20px",
  },
  legendColorBox: {
    width: "20px",
    height: "20px",
    marginRight: "10px",
    borderRadius: "3px",
  },
  legendText: {
    fontSize: "14px",
    color: "#333",
  },
};

const CounselorAppointments = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchAppointments = async () => {
    const counselor = JSON.parse(localStorage.getItem("counselor"));

    if (!counselor) {
      console.error("Counselor not logged in");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments/counselor/appointments",
        {
          params: {
            counselorId: counselor._id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const appointments = response.data.map((appointment) => {
        const appointmentDate = new Date(appointment.startTime);
        const currentDate = new Date();
        const endTime = new Date(appointment.endTime);
        const isWithinAWeek =
          (appointmentDate - currentDate) / (1000 * 60 * 60 * 24) <= 7;
        const hasEnded = (currentDate - endTime) / (1000 * 60) > 30; // Check if 30 minutes have passed since the end time
        const startTime = moment(appointment.startTime).format("hh:mm A");
        const endTimeFormatted = moment(appointment.endTime).format("hh:mm A");
        return {
          title: `${appointment.user.firstName} ${appointment.user.lastName} (${appointment.user.email})`,
          start: appointmentDate,
          end: endTime,
          color: hasEnded ? "grey" : isWithinAWeek ? "orange" : "blue",
          userId: appointment.user._id,
          sessionType: appointment.sessionType,
          id: appointment._id, // Add appointment ID for cancellation
          hasEnded, // Add flag for ended appointments
          startTime: appointment.startTime, // Add start time for session logic
          endTime: appointment.endTime, // Add end time for session logic
          userName: `${appointment.user.firstName} ${appointment.user.lastName}`, // Add user name
          userEmail: appointment.user.email, // Add user email
        };
      });
      setEvents(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Error fetching appointments.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
        margin: "5px 0",
        padding: "5px",
        fontSize: "0.9rem",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: event.hasEnded ? "none" : "auto", // Make past events unclickable
      },
    };
  };

  const handleEventClick = (event) => {
    const currentTime = new Date();
    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);
    const isSessionStart =
      currentTime >= new Date(startTime.getTime() - 5 * 60000) &&
      currentTime <= new Date(endTime.getTime() + 30 * 60000); // Add 30 minutes to the end time
    const eventWithUser = {
      ...event,
      isSessionStart,
    };
    if (event.hasEnded) {
      return; // Prevent clicking on past events
    }
    setSelectedEvent(eventWithUser);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <AnimatedWave />

      <div style={styles.container}>
        <h1>Appointment Calendar</h1>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={styles.calendar}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleEventClick}
        />

        {selectedEvent && (
          <ModalCounselor
            show={showModal}
            handleClose={handleCloseModal}
            event={selectedEvent}
            fetchAppointments={fetchAppointments} // Pass fetchAppointments function
          />
        )}

        <div style={styles.legend}>
          <div style={styles.legendItem}>
            <div
              style={{ ...styles.legendColorBox, backgroundColor: "orange" }}
            ></div>
            <span style={styles.legendText}>Within a week</span>
          </div>
          <div style={styles.legendItem}>
            <div
              style={{ ...styles.legendColorBox, backgroundColor: "blue" }}
            ></div>
            <span style={styles.legendText}>After a week</span>
          </div>
          <div style={styles.legendItem}>
            <div
              style={{ ...styles.legendColorBox, backgroundColor: "grey" }}
            ></div>
            <span style={styles.legendText}>Past appointments</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .rbc-calendar {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .rbc-toolbar {
          background: #007bff;
          color: white;
          border-radius: 10px 10px 0 0;
          padding: 10px;
        }

        .rbc-toolbar button {
          background: white;
          border: none;
          color: #007bff;
          padding: 5px 10px;
          border-radius: 5px;
          margin: 0 5px;
          cursor: pointer;
        }

        .rbc-toolbar button:hover {
          background: #e2e6ea;
        }

        .rbc-event {
          border: none !important;
          color: white !important;
          padding: 5px !important;
          border-radius: 5px !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rbc-event.orange {
          background-color: orange !important;
        }

        .rbc-event.blue {
          background-color: blue !important;
        }

        .rbc-event.grey {
          background-color: grey !important;
          pointer-events: none !important;
        }

        .rbc-today {
          background: #f8f9fa;
        }

        .rbc-month-view .rbc-header {
          background: #007bff;
          color: white;
          border: none;
          padding: 10px;
        }

        .rbc-month-view .rbc-header + .rbc-header {
          border-left: 1px solid white;
        }
      `}</style>
    </div>
  );
};

export default CounselorAppointments;
