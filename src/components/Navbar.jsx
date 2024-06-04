import {
    faCalendar,
    faChartLine,
    faHome,
    faNewspaper,
    faShoppingCart,
    faUserMd,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React from "react";
  import { Link, useNavigate } from "react-router-dom";
  
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
        style={{ backgroundColor: "#ffc0cb", borderRadius: "0 0 20px 20px" }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/home"
            style={{ paddingLeft: "2rem", display: "flex", alignItems: "center" }}
          >
            <img
              src={"/assets/images/menstrual-cycle (1).png"}
              alt="Logo"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            <h6 style={{ color: "white", fontStyle: "italic" }}>Crimson Cycle</h6>
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
            <div className="navbar-nav mx-auto">
              <Link className="nav-link text-white me-3" to="/home">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
              {user && (
                <>
                  {!user.isAdmin ? (
                    <>
                      <Link className="nav-link text-white me-3" to="/cal">
                        <FontAwesomeIcon icon={faCalendar} /> Calendar
                      </Link>
                      <Link
                        className="nav-link text-white me-3"
                        to="/admin/articleDashboard"
                      >
                        <FontAwesomeIcon icon={faNewspaper} /> Article
                      </Link>
                      <Link className="nav-link text-white me-3" to="/doctors">
                        <FontAwesomeIcon icon={faUserMd} /> Doctor
                      </Link>
                      <Link className="nav-link text-white me-3" to="/graphs">
                        <FontAwesomeIcon icon={faChartLine} /> Graph
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
              <div className="dropdown me-3">
                
  
               
                <Link className="nav-link text-white me-3" to="/graphs">
                       Diagnose
                      </Link>
          
                      <Link className="nav-link text-white me-3" to="/graphs">
                       Counselors
                      </Link>

                      <Link className="nav-link text-white me-3" to="/graphs">
                       About
                      </Link>
              </div>
            ) : (
              <div className="d-flex gap-2">
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
  