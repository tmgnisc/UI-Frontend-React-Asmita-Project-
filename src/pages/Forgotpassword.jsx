import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgetpasswordApi } from "../apis/Api";
import AnimatedWave from "../components/AnimatedWave";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const handleForgotPasswordEmail = (e) => {
    setForgotPasswordEmail(e.target.value);
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    const data = {
      email: forgotPasswordEmail,
    };
    forgetpasswordApi(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Internal server error");
      });
  };

  return (
    <div className="wave-section">
      <AnimatedWave />
      <div
        className=" form-container d-flex justify-content-center align-items-center  border rounded"
        style={{ minHeight: "30vh", backgroundColor: "#ffffff" }}
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
          <h2 className="text-center mb-3 " style={{ color: "#3586ff" }}>
            Forgot Password?
          </h2>
          <p className="text-center">
            Don’t worry, happens to all of us. Enter your email below to recover
            your password.
          </p>
          <form>
            <div className="mb-3">
              <label>Email</label>
              <input
                onChange={handleForgotPasswordEmail}
                className="form-control"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <button
              onClick={forgotPassword}
              className=" custom-button border rounded btn w-100"
              style={{
                color: "black",
                border: " 6px solid black",
                width: "50%",
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
