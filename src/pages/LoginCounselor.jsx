import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginCounselorApi } from "../apis/Api";
import AnimatedWave from "../components/AnimatedWave";

const LoginCounselor = () => {
  const [counselorCode, setCounselorCode] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const changeCounselorCode = (e) => {
    setCounselorCode(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(counselorCode, password);

    if (!counselorCode || !password) {
      toast.error("Please enter all fields");
      return;
    }

    const data = {
      counselorCode: counselorCode,
      password: password,
    };

    try {
      const res = await loginCounselorApi(data);
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("counselor", JSON.stringify(res.data.userData));
        navigate("/home");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="wave-section">
      <AnimatedWave />
      <div
        className="form-container d-flex justify-content-center align-items-center border rounded"
        style={{ minHeight: "70vh", backgroundColor: "#ffffff" }}
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
            Hey! Log In to your account
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Counselor Code</label>
              <input
                onChange={changeCounselorCode}
                className="form-control"
                type="text"
                placeholder="Enter your counselor code"
                value={counselorCode}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                onChange={changePassword}
                className="form-control"
                type="password"
                placeholder="Enter your password"
                value={password}
              />
              <div className="text-end mt-2">
                <Link to="/forgot-password" className="text-decoration-none">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              type="submit"
              className="custom-button border rounded btn w-100"
              style={{
                color: "black",
                border: "6px solid black",
                width: "50%",
              }}
            >
              Login
            </button>
            <div className="text-center mt-2">
              New to the application?{" "}
              <Link to="/register" className="text-decoration-none">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginCounselor;
