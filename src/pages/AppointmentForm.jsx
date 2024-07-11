import { Typography } from "@mui/material";
import axios from "axios";
import khaltiCheckout from "khalti-checkout-web";
import React, { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5"; // Import the back icon
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AnimatedWave from "../components/AnimatedWave";
import FaqContainer from "../components/FAQ";
import QRCodeComponent from "../components/QRcodeScanner";
import config from "../components/khalti/khaltiConfig";
import esewa from "../images/esewa.png";
import khalti from "../images/khalti.png";
import namaste from "../images/namaste.png";
import TimeSlotSelection from "./TimeSlotSelection";

const AppointmentForm = ({ fetchAppointments, counselors = [] }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  let checkout = new khaltiCheckout(config);

  const [formData, setFormData] = useState({
    userId: user ? user._id : "",
    counselorId: "",
    date: "",
    startTime: "",
    endTime: "",
    duration: "",
    price: "",
    sessionType: "Individual",
  });

  const [step, setStep] = useState(1);
  const [timeSlots, setTimeSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  // Calculate today's date and the date two months from now
  const today = new Date().toISOString().split("T")[0];
  const twoMonthsFromNow = new Date();
  twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);
  const maxDate = twoMonthsFromNow.toISOString().split("T")[0];

  const faqData = [
    {
      question: "How do I book a session with a counselor on our platform?",
      answer:
        "Booking a session with a counselor on our platform is straightforward. First, navigate to the booking section on our website. Then, select a counselor from the dropdown list based on your preference. After selecting a counselor, choose the type of counseling session you are interested in, whether it be individual therapy, couples therapy, or another type of counseling. Next, you will need to select a date and time that works best for you from the available slots. Once you have made your selections, you can proceed to the payment section to complete your booking. Our system will guide you through each step to ensure a smooth booking experience.",
    },
    {
      question:
        "How will I know if my booking with a counselor is confirmed successfully?",
      answer:
        "After you have completed the booking process, you will receive a confirmation email to the email address you provided during booking. This email will contain all the details of your appointment, including the date, time, and the name of the counselor you booked with. Additionally, you can always check the status of your booking by logging into your account on our platform and navigating to the 'My Appointments' section. Here, you will find a list of all your upcoming and past appointments, along with their statuses.",
    },
    {
      question: "Can I cancel or reschedule my booking if something comes up?",
      answer:
        "Yes, you can cancel or reschedule your booking if your plans change. To do this, log into your account and go to your dashboard. From there, navigate to the 'My Appointments' section where you will see a list of your upcoming sessions. Select the appointment you wish to change and follow the prompts to either cancel or reschedule. Please note that our cancellation policy applies, and depending on how close to the appointment time you are making changes, a fee may be applicable. We recommend checking our cancellation policy for detailed information.",
    },
    {
      question:
        "Is it possible to switch counselors after I have already booked a session?",
      answer:
        "Switching counselors after booking a session is possible, but it requires contacting our support team. If you feel the need to switch to a different counselor, please reach out to our support team with your request. They will assist you in finding another counselor that fits your needs and preferences. Please note that switching counselors might affect your appointment time, so we advise making this request as soon as possible to accommodate your scheduling needs.",
    },
    {
      question:
        "Are there any fees associated with canceling or rescheduling a session?",
      answer:
        "There may be fees associated with canceling or rescheduling a session, depending on how close to the session date you make the change. Our cancellation policy outlines the specific conditions under which fees apply. Typically, if you cancel or reschedule a session well in advance, you may not incur any fees. However, cancellations or rescheduling requests made within a certain time frame before the session may be subject to a fee. We encourage you to review our detailed cancellation policy to understand any potential charges that might apply.",
    },
  ];

  useEffect(() => {
    if (!user || !token) {
      toast.error("You need to log in first.");
      return;
    }
  }, [user, token]);

  useEffect(() => {
    // Fetch already booked slots for the selected counselor and date
    if (formData.counselorId && formData.date) {
      axios
        .get("http://localhost:5000/api/appointments/booked", {
          params: {
            counselorId: formData.counselorId,
            date: formData.date,
          },
        })
        .then((response) => {
          setBookedSlots(response.data);
        })
        .catch((error) => {
          console.error("Error fetching booked slots:", error);
        });
    }
    const handleScroll = () => {
      const heading = document.getElementById("fixed-heading");
      const waveSection = document.querySelector(".wave-section");

      if (window.scrollY > waveSection.offsetHeight) {
        heading.style.position = "relative";
        heading.style.top = "0";
        heading.style.transform = "translate(-50%, 0)";
      } else {
        heading.style.position = "fixed";
        heading.style.top = "25%";
        heading.style.transform = "translate(-50%, -50%)";
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [formData.counselorId, formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleEsewaPayment = () => {
    if (!isConfirmed) {
      setShowError(true);
      return;
    }
    setShowQRCode(true);
  };
  const handleDurationChange = (duration) => {
    let slots = [];
    let price = 0;
    if (duration === "15") {
      slots = [
        "12:00 PM-12:15 PM",
        "12:15 PM-12:30 PM",
        "12:30 PM-12:45 PM",
        "12:45 PM-1:00 PM",
      ];
      price = 500;
    } else if (duration === "90") {
      slots = [
        "8:00 AM-9:30 AM",
        "10:30 AM-12:00 PM",
        "4:00 PM-5:30 PM",
        "5:30 PM-7:00 PM",
      ];
      price = 1200;
    }
    setTimeSlots(slots);
    setFormData({ ...formData, duration, price, startTime: "", endTime: "" });
  };
  // const existingAppointments = await Appointment.find({
  //   counselor: counselorId,
  //   date: date,
  //   $or: [
  //     { startTime: { $lt: endTimeDate, $gte: startTimeDate } },
  //     { endTime: { $gt: startTimeDate, $lte: endTimeDate } }
  //   ]
  // });
  const handleTimeSlotChange = (value) => {
    const [start, end] = value.split("-");
    setFormData({
      ...formData,
      startTime: start.trim(),
      endTime: end.trim(),
    });
  };

  const isSlotBooked = (slot) => {
    return bookedSlots.some((appointment) => {
      const [start, end] = slot.split("-");
      const appointmentStart = new Date(
        `${formData.date}T${appointment.startTime}`
      );
      const appointmentEnd = new Date(
        `${formData.date}T${appointment.endTime}`
      );
      const slotStart = new Date(`${formData.date}T${start.trim()}`);
      const slotEnd = new Date(`${formData.date}T${end.trim()}`);
      return (
        (slotStart >= appointmentStart && slotStart < appointmentEnd) ||
        (slotEnd > appointmentStart && slotEnd <= appointmentEnd)
      );
    });
  };

  const convertTo24HourFormat = (time12h) => {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    } else if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log form data for debugging
    console.log("formData:", formData);

    // Convert times to 24-hour format
    const startTime24h = convertTo24HourFormat(formData.startTime);
    const endTime24h = convertTo24HourFormat(formData.endTime);

    // Log the converted times
    console.log("startTime24h:", startTime24h);
    console.log("endTime24h:", endTime24h);

    try {
      // Prepare the payload
      const payload = {
        userId: formData.userId,
        counselorId: formData.counselorId,
        date: formData.date,
        startTime: startTime24h, // Use only the time in 24-hour format
        endTime: endTime24h, // Use only the time in 24-hour format
        duration: formData.duration,
        price: formData.price,
        sessionType: formData.sessionType,
      };

      // Log the payload for debugging
      console.log("payload:", payload);

      const response = await axios.post(
        "http://localhost:5000/api/appointments/book",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        fetchAppointments();
        setFormData({
          userId: user ? user._id : "",
          counselorId: "",
          date: "",
          startTime: "",
          endTime: "",
          duration: "",
          price: "",
          sessionType: "Individual",
        });
        toast.success("Appointment booked successfully!");
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error booking appointment.";
      toast.error(errorMessage);
    }
  };

  const handlePayment = () => {
    if (!isConfirmed) {
      setShowError(true);
      return;
    }
    checkout.show({ amount: formData.price });
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleViewBookings = () => {
    navigate("/user/calendar");
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
        Book a Session
      </Typography>
      <div className="appointment-container">
        <div
          className="progress-bar"
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
        <div className="sidebar">
          <h2>Secure Your Path to Wellness</h2>
          <button className={`sidebar-button ${step >= 1 && "completed"}`}>
            Counselor
          </button>
          <button className={`sidebar-button ${step >= 2 && "completed"}`}>
            Counseling Type
          </button>
          <button className={`sidebar-button ${step >= 3 && "completed"}`}>
            Date & Time
          </button>
          <button className={`sidebar-button ${step >= 4 && "completed"}`}>
            Payment
          </button>
          <button
            onClick={handleViewBookings}
            className="sidebar-button view-bookings"
          >
            View my Bookings
          </button>
        </div>
        <form onSubmit={handleSubmit} className="appointment-form">
          {step === 1 && (
            <div className="form-step">
              <div className="summary-header">
                <h3>Counselor</h3>
              </div>
              <hr className="divider" /> <label>Select a Counselor</label>
              <div className="custom-select-container">
                <select
                  name="counselorId"
                  value={formData.counselorId}
                  onChange={handleChange}
                  required
                  className="custom-select"
                >
                  <option value="">Choose a counselor</option>
                  {counselors.map((counselor) => (
                    <option key={counselor._id} value={counselor._id}>
                      {counselor.counselorName}
                    </option>
                  ))}
                </select>
                <div className="custom-select-arrow"></div>
              </div>
              <div className="form-navigation">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="prev-button"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={nextStep}
                  className="next-button"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="form-step">
              <div className="summary-header">
                <IoArrowBack
                  className="back-icon"
                  onClick={prevStep}
                  size={20}
                />
                <h3>Counselling Type</h3>
              </div>
              <hr className="divider" />
              <label>Select Counseling Type</label>
              <div className="custom-checkbox-container">
                <input
                  type="checkbox"
                  id="individual"
                  name="sessionType"
                  value="Individual"
                  checked={formData.sessionType === "Individual"}
                  onChange={handleChange}
                  className="custom-checkbox"
                />
                <label htmlFor="individual" className="custom-checkbox-label">
                  Individual
                </label>
              </div>
              <div className="custom-checkbox-container">
                <input
                  type="checkbox"
                  id="teenager"
                  name="sessionType"
                  value="Teenager"
                  checked={formData.sessionType === "Teenager"}
                  onChange={handleChange}
                  className="custom-checkbox"
                />
                <label htmlFor="teenager" className="custom-checkbox-label">
                  Teenager
                </label>
              </div>
              <div className="custom-checkbox-container">
                <input
                  type="checkbox"
                  id="couple"
                  name="sessionType"
                  value="Couple"
                  checked={formData.sessionType === "Couple"}
                  onChange={handleChange}
                  className="custom-checkbox"
                />
                <label htmlFor="couple" className="custom-checkbox-label">
                  Couple
                </label>
              </div>
              <div className="form-navigation">
                <button
                  type="button"
                  onClick={nextStep}
                  className="next-button"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <div className="summary-header">
                <IoArrowBack
                  className="back-icon"
                  onClick={prevStep}
                  size={20}
                />
                <h3>Time and Date</h3>
              </div>
              <hr className="divider" />
              <label>Choose an appropriate date for session</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                min={today}
                max={maxDate}
              />
              <label>Select session duration</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={(e) => handleDurationChange(e.target.value)}
                required
              >
                <option value="">Duration</option>
                <option value="15">15 minutes</option>
                <option value="90">1 and half hour</option>
              </select>
              <TimeSlotSelection
                date={formData.date}
                today={today}
                maxDate={maxDate}
                timeSlots={timeSlots}
                bookedSlots={bookedSlots}
                onDateChange={handleChange}
                onTimeSlotChange={handleTimeSlotChange}
                price={formData.price}
                checkout={checkout}
              />
              <div className="form-navigation">
                <button
                  type="button"
                  onClick={nextStep}
                  className="next-button"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="form-step payment-summary">
              <div className="summary-header">
                <IoArrowBack
                  className="back-icon"
                  onClick={prevStep}
                  size={24}
                />
                <h3>Payment Summary</h3>
              </div>
              <hr className="divider" />
              <div className="summary-box">
                <div className="summary-content">
                  <span>One counseling session * 1 person</span>
                  <span style={{ color: "green" }}>Rs. {formData.price}</span>
                </div>
                <hr className="summary-divider" />
                <div className="summary-total">
                  <span>Total:</span>
                  <span style={{ color: "green" }}>Rs. {formData.price}</span>
                </div>

                <label className="confirmation-label">
                  <input
                    type="checkbox"
                    checked={isConfirmed}
                    onChange={() => setIsConfirmed(!isConfirmed)}
                    className="confirmation-checkbox"
                  />
                  <span className="confirmation-text">
                    I confirm that the payment summary is correct.
                  </span>
                </label>
                {showError && !isConfirmed && (
                  <p className="error-message">
                    Please confirm the payment summary first.
                  </p>
                )}
                <div className="payment-options">
                  <span>Pay via:</span>
                  <img
                    src={khalti}
                    alt="Khalti"
                    className="payment-logo"
                    onClick={handlePayment}
                  />
                  <img
                    src={esewa}
                    alt="eSewa"
                    className="payment-logo"
                    onClick={handleEsewaPayment}
                  />
                </div>
              </div>
              <div className="form-navigation">
                <button type="submit" className="submit-button">
                  Complete Booking
                </button>
                <button
                  type="button"
                  onClick={handleViewBookings}
                  className="view-booking-button"
                >
                  View Booking
                </button>
              </div>
            </div>
          )}
        </form>
        {showQRCode && (
          <div className="popup-overlay" onClick={() => setShowQRCode(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <QRCodeComponent onDone={() => setShowQRCode(false)} />
            </div>
          </div>
        )}

        <style jsx>{`
          .appointment-container {
            display: flex;
            flex-direction: row;
            max-width: 1170px;
            margin: 10px auto;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            position: relative;
          }

          .progress-bar {
            position: absolute;
            top: 0;
            left: 0;
            height: 5px;
            background-color: #3973e1;
            transition: width 0.3s ease-in-out;
          }

          .sidebar {
            background-color: #3973e1;
            color: #fff;
            padding: 20px;
            width: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000; /* Ensure the popup is above other elements */
          }

          .popup-content {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
            position: relative;
          }

          .sidebar h2 {
            margin-bottom: 20px;
            font-size: 1.5rem;
          }

          .sidebar-button {
            background: none;
            border: 1px solid #fff;
            color: #fff;
            padding: 5px;
            margin-bottom: 10px;
            width: 100%;
            text-align: center;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            height: 40px;
          }

          .sidebar-button.completed {
            background-color: #b2d5f5;
            color: #ffffff;
            border: none;
          }

          .sidebar-button.active,
          .sidebar-button:hover {
            background-color: #fff;
            color: #007bff;
          }

          .sidebar-button:focus {
            outline: none;
          }

          .view-bookings {
            margin-top: 30px;
            margin-bottom: 5px;
            background-color: #fff;
            color: #000;
          }

          .appointment-form {
            width: 70%;
            padding: 20px;
          }

          .custom-select-container {
            position: relative;
            width: 100%; /* Adjust as needed */
          }

          .custom-select {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            width: 100%;
            padding: 10px;
            padding-right: 30px; /* Space for the arrow */
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: white;
            font-size: 16px;
          }

          .custom-select-arrow {
            position: absolute;
            top: 35%;
            right: 10px;
            width: 0;
            height: 0;
            pointer-events: none;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid #000;
            transform: translateY(-50%);
            transition: transform 0.3s ease;
          }

          .custom-select:focus + .custom-select-arrow,
          .custom-select:active + .custom-select-arrow {
            transform: translateY(-50%) rotate(180deg);
          }
          .form-step {
            margin-bottom: 20px;
          }

          .form-step label {
            display: block;
            margin-bottom: 10px;
            font-size: 1.2rem;
          }

          .form-step select,
          .form-step input {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          .form-navigation {
            position: absolute;
            bottom: 10px;
            right: 10px;
            display: flex;
            justify-content: space-between;
            gap: 10px; /* Adjust the spacing between buttons */
          }

          .next-button,
          .prev-button,
          .submit-button {
            background-color: #ffffff;
            color: #000000;
            padding: 5px 20px;
            border: 1px solid #000;
            border-radius: 5px;
            cursor: pointer;
          }

          .next-button:hover,
          .prev-button:hover,
          .submit-button:hover {
            background-color: #f0f0f0; /* Add a hover effect if needed */
          }

          .next-button:focus,
          .prev-button:focus,
          .submit-button:focus {
            outline: none;
          }
          .summary-header {
            display: flex;
            align-items: center;
          }

          .back-icon {
            cursor: pointer;
            margin-right: 10px;
            margin-top: -5px;
          }

          .divider {
            border: none;
            border-top: 2px solid #3973e1;
            margin-top: 1px; /* Margin on the top */
            margin-bottom: 10px; /* Margin on the bottom */
          }

          .summary-box {
            border: 1px solid #e6f7ff; /* Set the border color */
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
          }

          .summary-content,
          .summary-total {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .summary-divider {
            border: none;
            border-top: 1px solid #3973e1;
            margin: 10px 0;
          }

          .confirmation-label {
            display: flex;
            align-items: center;
            margin: 10px 0;
          }

          .confirmation-checkbox {
            margin-right: 10px; /* Adjust the spacing between the checkbox and the label text */
          }

          .confirmation-text {
            font-size: 1rem; /* Adjust the font size as needed */
          }

          .error-message {
            color: red;
            font-size: 0.9rem;
            margin: 5px 0;
          }

          .payment-options {
            display: flex;
            align-items: center;
            margin-top: 10px;
          }

          .payment-logo {
            margin: 0 10px;
            height: 40px;
            cursor: pointer;
          }

          .view-booking-button {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
          }

          .view-booking-button:hover {
            background-color: #0056b3;
          }

          .view-booking-button:focus {
            outline: none;
          }

          .custom-checkbox-container {
            display: flex;
            align-items: center;
            margin: 10px 0;
          }

          .custom-checkbox {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
          }

          .custom-checkbox-label {
            position: relative;
            padding-left: 30px;
            cursor: pointer;
            user-select: none;
            display: flex;
            align-items: center;
          }

          .custom-checkbox-label::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 20px;
            width: 20px;
            background-color: white;
            border: 2px solid #ccc;
            border-radius: 5px;
            transition: background-color 0.3s, border-color 0.3s;
          }

          .custom-checkbox-label::after {
            content: "";
            position: absolute;
            left: 5px;
            top: 10px;
            width: 6px;
            height: 12px;
            border: solid white;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
            opacity: 0;
            transition: opacity 0.3s;
          }

          .custom-checkbox:checked + .custom-checkbox-label::before {
            background-color: #4caf50;
            border-color: #4caf50;
          }

          .custom-checkbox:checked + .custom-checkbox-label::after {
            opacity: 1;
          }
        `}</style>
      </div>

      <div className="additional-info" style={{ marginTop: "40px" }}>
        <div style={styles.container}>
          <div style={styles.textSection}>
            <h4 style={styles.textSectionH2}>
              The Best Counseling Service That You Can Trust{" "}
            </h4>
            <div className="namaste" style={{ textAlign: "right" }}>
              <h5>Experienced Counselors</h5>
              <p style={{ color: "grey" }}>
                Your privacy is our top priority. All sessions are conducted in
                a safe and confidential environment. We use the latest
                technology to ensure that your information is protected and that
                you feel secure during your counseling sessions.
              </p>
              <h5>Confidential and Secure</h5>
              <p style={{ color: "grey" }}>
                Your privacy is our top priority. All sessions are conducted in
                a safe and confidential environment. We use the latest
                technology to ensure that your information is protected and that
                you feel secure during your counseling sessions.
              </p>
              <h5>Proven Results</h5>
              <p style={{ color: "grey" }}>
                Our clients consistently report positive outcomes and improved
                well-being. We utilize evidence-based practices and continuously
                update our methods based on the latest research in psychology
                and mental health.
              </p>
            </div>
          </div>
          <div style={styles.imageSection}>
            <div style={styles.imageWrapper}>
              <img
                src={namaste}
                alt="Mental Health Assessment"
                style={styles.wellnessImage}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="App">
        <FaqContainer faqs={faqData} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px",
    maxWidth: "1200px",
    margin: "20px auto",
  },
  textSection: {
    flex: 2.9,
    paddingRight: "20px",
  },
  textSectionH2: {
    fontSize: "1.8rem",
    marginBottom: "20px",
    textAlign: "right",
  },
  textSectionP: {
    fontSize: "1.1rem",
    marginBottom: "20px",
    textAlign: "right",
  },
  namaste: {
    fontSize: "1.1rem",
    textAlign: "right",
  },

  imageSection: {
    flex: 1,
    textAlign: "center",
  },
  imageWrapper: {
    display: "inline-block",
    textAlign: "center",
    width: "100%",
    maxWidth: "300px",
  },
  wellnessImage: {
    width: "100%",
    borderRadius: "10px",
  },
  fixedHeading: {
    position: "absolute",
    top: "22%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: "bold",
    color: "white",
  },
};

export default AppointmentForm;
