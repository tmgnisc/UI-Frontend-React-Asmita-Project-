import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import NavbarWrapper from "./components/NavbarWrapper";
import Register from "./pages/Register";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Router>
        <NavbarWrapper />

        <ToastContainer />
        <Routes>
          {/* <Route path="/" element={<SplashScreenHandler />} /> */}
          {/* <Route path="/home" element={<Homepage />} /> */}

          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />


          {/* <Route path="/login" element={<Login />} /> */}

          {/* <Route
            path="/password-reset/:userId/:token"
            element={<PasswordResetForm />}
          /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
