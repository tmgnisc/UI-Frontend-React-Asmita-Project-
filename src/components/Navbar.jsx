// src/components/Navbar.js

import { faChartLine, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../images/Mann Ko Bhawana.png"; // Import the image

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const counselor = JSON.parse(localStorage.getItem("counselor"));
  const navigator = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigator("/login");
    window.location.reload();
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className={`nav-link ${isActive("/home")}`} to="/home">
              Home
            </Link>
            {(user || counselor) && (
              <>
                {user && !user.isAdmin && (
                  <>
                    <Link className={`nav-link ${isActive("/user/issue")}`} to="/user/issue">
                      Diagnose
                    </Link>
                    <Link className={`nav-link ${isActive("/user/counselor")}`} to="/user/counselor">
                      Counselors
                    </Link>
                    <Link className={`nav-link ${isActive("/user/form")}`} to="/user/form">
                      Booking
                    </Link>
                    <Link className={`nav-link ${isActive("/aboutus")}`} to="/aboutus">
                      About
                    </Link>
                  </>
                )}
                {user && user.isAdmin && (
                  <Link className={`nav-link ${isActive("/admin/dashboard")}`} to="/admin/dashboard">
                    <FontAwesomeIcon icon={faChartLine} /> Dashboard
                  </Link>
                )}
                {counselor && (
                  <>
                    <Link className={`nav-link ${isActive("/hippa")}`} to="/hippa">
                      HIPPA
                    </Link>
                    <Link className={`nav-link ${isActive("/counselor/calendar")}`} to="/counselor/calendar">
                      Appointments
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          {user || counselor ? (
            <div className="d-flex align-items-center ms-3">
              <Link className="btn btn-outline-light me-3" to="/profile">
                {(user && user.firstName) || (counselor && counselor.counselorName)}
              </Link>

              <FontAwesomeIcon
                icon={faSignOutAlt}
                onClick={handleLogout}
                className="logout-icon"
                title="Logout"
              />
            </div>
          ) : (
            <div className="dropdown ms-auto">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                id="loginDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Login
              </button>
              <ul className="dropdown-menu" aria-labelledby="loginDropdown">
                <li>
                  <Link className="dropdown-item" to="/login?type=client">
                    Client
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/login?type=provider">
                    Provider
                  </Link>
                </li>
              </ul>

              <Link className="btn btn-outline-light ms-2" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background-color: #3b82f6;
          padding: 0.5rem 1rem;
        }

        .navbar-logo {
          width: 60px;
          height: auto;
        }

        .navbar-nav .nav-link {
          color: #fff;
          margin: 0 0.5rem;
        }

        .navbar-nav .nav-link.active {
          border-bottom: 2px solid #fff;
        }

        .btn-outline-light {
          color: #fff;
          border-color: #fff;
        }

        .btn-outline-light:hover {
          background-color: #fff;
          color: #3b82f6;
        }

        .logout-icon {
          cursor: pointer;
          color: #fff;
        }

        @media (max-width: 768px) {
          .navbar-nav {
            text-align: center;
          }

          .navbar-nav .nav-link {
            margin: 0.5rem 0;
          }
        }

        @media (max-width: 576px) {
          .navbar-logo {
            width: 50px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
