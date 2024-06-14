import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";
import { registerApi } from "../apis/Api";
import AnimatedWave from "../components/AnimatedWave";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Create navigate instance

  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password);

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    // Send data to backend
    registerApi(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Internal Server Error!");
      });
  };

  return (
    <div className="wave-section">
      <AnimatedWave />
      <div
        className="form-container1 d-flex justify-content-center align-items-center border rounded "
        style={{ minHeight: "85vh", backgroundColor: "#ffffff" }}
      >
        <div
          className="border rounded p-4"
          style={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "#ffccc",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h2 className="text-center mb-3" style={{ color: "#3586ff" }}>
            Create your account!
          </h2>
          <form>
            <div className="mb-3">
              <label>First Name</label>
              <input
                onChange={changeFirstName}
                className="form-control"
                type="text"
                placeholder="Enter your first name"
              />
            </div>
            <div className="mb-3">
              <label>Last Name</label>
              <input
                onChange={changeLastName}
                className="form-control"
                type="text"
                placeholder="Enter your last name"
              />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                onChange={changeEmail}
                className="form-control"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                onChange={changePassword}
                className="form-control"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="custom-button border rounded btn w-100"
              style={{
                color: "black",
                border: " 6px solid black",
                width: "50%",
              }}
            >
              Register
            </button>
            <div className="text-center mt-2">
              Already have an account?{" "}
              <a href="/login" className="text-decoration-none">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
