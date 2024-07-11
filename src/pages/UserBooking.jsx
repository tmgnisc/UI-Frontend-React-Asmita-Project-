import { Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Puff } from "react-loader-spinner"; // Import the loader component
import { toast } from "react-toastify";
import { getAllCounselorsApi } from "../apis/Api";
import AnimatedWave from "../components/AnimatedWave";
import ModalEvent from "../components/Modal";

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
  waveSection: {
    height: "200px",
  },
  calendar: {
    height: "700px",
    width: "100%",
    margin: "0px 0",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  event: {
    padding: "5px",
    borderRadius: "5px",
    color: "white",
    textAlign: "center",
    fontSize: "0.9rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  fixedHeading: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: "bold",
    color: "white",
  },
};

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [counselors, setCounselors] = useState([]);
  const [counselorMap, setCounselorMap] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_API_URL || "http://localhost:5000"
        }/api/appointments/booked`,
        {
          params: { userId: user._id },
        }
      );

      const appointments = response.data.map((appointment) => {
        const appointmentDate = new Date(appointment.startTime);
        const currentDate = new Date();
        const endTime = new Date(appointment.endTime);
        const isWithinAWeek =
          (appointmentDate - currentDate) / (1000 * 60 * 60 * 24) <= 7;
        const hasEnded = (currentDate - endTime) / (1000 * 60) > 30;
        const startTime = moment(appointment.startTime).format("hh:mm A");
        const endTimeFormatted = moment(appointment.endTime).format("hh:mm A");

        return {
          title: `${startTime} - ${endTimeFormatted}`,
          start: appointmentDate,
          end: endTime,
          color: hasEnded ? "grey" : isWithinAWeek ? "orange" : "blue",
          sessionType: appointment.sessionType,
          counselorId: appointment.counselor,
          id: appointment._id,
          hasEnded,
          startTime: appointment.startTime,
          endTime: appointment.endTime,
        };
      });
      setEvents(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Error fetching appointments.");
    }
    setLoading(false);
  };

  const fetchCounselors = async () => {
    try {
      const response = await getAllCounselorsApi();
      const counselors = response.data.counselors;
      const counselorMap = {};
      counselors.forEach((counselor) => {
        counselorMap[counselor._id] = counselor.counselorName;
      });
      setCounselors(counselors);
      setCounselorMap(counselorMap);
    } catch (error) {
      console.error("Error fetching counselors:", error);
      toast.error("Error fetching counselors.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCounselors();
        await fetchAppointments();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Data fetching is complete, set loading to false
      }
    };

    fetchData();

    const handleScroll = () => {
      const heading = document.getElementById("fixed-heading");
      const waveSection = document.querySelector(".wave-section");

      if (window.scrollY > waveSection.offsetHeight) {
        heading.style.position = "relative";
        heading.style.top = "0";
        heading.style.transform = "translate(-50%, 0)";
      } else {
        heading.style.position = "fixed";
        heading.style.top = "10%";
        heading.style.transform = "translate(-50%, -50%)";
      }
    };

    window.addEventListener("scroll", handleScroll);

    const handleStorageChange = (event) => {
      if (event.key === "navigateToCalendar") {
        window.location.href = "/user/calendar";
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color;
    return {
      className: backgroundColor,
      style: {
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
        pointerEvents: event.hasEnded ? "none" : "auto",
      },
    };
  };

  const handleEventClick = (event) => {
    const currentTime = new Date();
    const startTime = new Date(event.startTime);
    const endTime = new Date(event.endTime);
    const isSessionStart =
      currentTime >= new Date(startTime.getTime() - 5 * 60000) &&
      currentTime <= new Date(endTime.getTime() + 30 * 60000);
    const counselorName = counselorMap[event.counselorId];
    const eventWithCounselor = {
      ...event,
      counselorName,
      isSessionStart,
    };
    setSelectedEvent(eventWithCounselor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <AnimatedWave />
      <Typography
        id="fixed-heading"
        variant="h4"
        component="div"
        style={styles.fixedHeading}
      >
        My Bookings
      </Typography>

      <div style={styles.container}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "700px",
            }}
          >
            <Puff
              height="100"
              width="100"
              radisu="9"
              color="#007bff"
              ariaLabel="loading"
            />
          </div>
        ) : (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={styles.calendar}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={handleEventClick}
          />
        )}

        {selectedEvent && (
          <ModalEvent
            show={showModal}
            handleClose={handleCloseModal}
            event={selectedEvent}
            fetchAppointments={fetchAppointments}
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
          background-color: #007bff !important;
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

export default MyCalendar;
