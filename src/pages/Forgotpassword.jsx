
import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgetpasswordApi } from "../apis/Api";

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

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  };

  const labelStyle = {
    marginBottom: "10px",
    fontWeight: "bold",
  };

  const inputStyle = {
    marginBottom: "20px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#c2185b",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  return (
    <div style={{ paddingTop: "50px" }}>
      <h2 style={{ textAlign: "center" }}>Password Reset</h2>
      <form style={formStyle}>
        <label htmlFor="email" style={labelStyle}>
          Enter your email address:
        </label>
        <input
          type="email"
          id="email"
          onChange={handleForgotPasswordEmail}
          required
          style={inputStyle}
        />
        <button onClick={forgotPassword} type="submit" style={buttonStyle}>
          Send Password Reset Email
        </button>
      </form>
    </div>
  );
};

export default PasswordResetRequest;
