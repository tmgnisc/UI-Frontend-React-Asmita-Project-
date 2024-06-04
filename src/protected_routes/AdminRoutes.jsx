import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate(); // Fixed: Added parentheses to call useNavigate

  useEffect(() => {
    // Check if user is not null and not an admin, then navigate to login
    if (user === null || !user.isAdmin) {
      navigate("/home");
    }
  }, [user, navigate]); // Added useEffect to handle redirection

  return <Outlet />;
};

export default AdminRoutes;
