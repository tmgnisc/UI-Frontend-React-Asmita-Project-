import axios from "axios";
import { toast } from "react-toastify";

// Function to book an appointment
export const bookAppointment = async (formData, token, fetchAppointments, setFormData, user) => {
  try {
    // Prepare the payload
    const payload = {
      userId: formData.userId,
      counselorId: formData.counselorId,
      date: formData.date,
      startTime: convertTo24HourFormat(formData.startTime), // Use only the time in 24-hour format
      endTime: convertTo24HourFormat(formData.endTime), // Use only the time in 24-hour format
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
