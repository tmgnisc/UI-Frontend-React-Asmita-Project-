import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllCounselorsApi } from "../apis/Api";
import AppointmentForm from "./AppointmentForm";

const ParentComponent = () => {
  const [appointments, setAppointments] = useState([]);
  const [counselors, setCounselors] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/appointments"
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchCounselors = async () => {
    try {
      const response = await getAllCounselorsApi();
      const counselors = response.data.counselors;
      setCounselors(counselors);
    } catch (error) {
      console.error("Error fetching counselors:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchCounselors();
  }, []);

  return (
    <div>
      <AppointmentForm
        fetchAppointments={fetchAppointments}
        counselors={counselors}
      />
      {/* You can display appointments or other components here */}
    </div>
  );
};

export default ParentComponent;
