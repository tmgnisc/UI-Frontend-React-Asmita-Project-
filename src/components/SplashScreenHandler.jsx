import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SplashScreen from "./SplashScreen";

const SplashScreenHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      const userToken = localStorage.getItem("token"); // Replace 'token' with your actual token key
      if (userToken) {
        navigate("/home"); // User is logged in, navigate to the homepage
      } else {
        navigate("/login"); // User is not logged in, navigate to the login page
      }
    }, 3500); // Adjust the time as needed
  }, [navigate]);

  return <SplashScreen />;
};

export default SplashScreenHandler;
