import {
  faCalendar,
  faChartLine,
  faHome,
  faNewspaper,
  faUserMd,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from '../images/Mann Ko Bhawana.png'; // Import the image

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigator = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigator("/login");
    window.location.reload();
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link
          className="navbar-brand"
          to="/home"
          style={{ paddingLeft: "2rem", display: "flex", alignItems: "center" }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: "80px", height: "80px", marginRight: "10px" }}
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-link text-white me-3" to="/home">
             Home
            </Link>
            {user && (
              <>
                {!user.isAdmin ? (
                  <>
                    <Link className="nav-link text-white me-3" to="/cal">
                     Diagnose
                    </Link>
                    <Link
                      className="nav-link text-white me-3"
                      to="/admin/articleDashboard"
                    >
                      Counselors
                    </Link>
                    <Link className="nav-link text-white me-3" to="/doctors">
                       Booking
                    </Link>
                    <Link className="nav-link text-white me-3" to="/graphs">
                   About
                    </Link>
                  </>
                ) : (
                  <Link
                    className="nav-link text-white me-3"
                    to="/admin/dashboard"
                  >
                    <FontAwesomeIcon icon={faChartLine} /> Products
                  </Link>
                )}
              </>
            )}
          </div>

          {user ? (
            <div className="dropdown me-3 ms-auto">
              <button
                className="btn btn-outline-light dropdown-toggle me-3"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.firstName}!
              </button>

              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/changepp">
                    Change password
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>

            
            </div>
          ) : (
            <div className="d-flex gap-2 ms-auto">
              <Link className="btn btn-outline-light" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-light me-2" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
