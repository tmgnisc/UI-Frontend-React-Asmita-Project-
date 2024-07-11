import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPasswordApi } from "../apis/Api";
import AnimatedWave from "../components/AnimatedWave";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleResetPassword = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!newPassword) {
      toast.error("Please enter a new password.");
      return;
    }

    const data = {
      password: newPassword,
    };

    resetPasswordApi(data, token)
      .then((res) => {
        console.log("API response:", res);
        if (res.data && res.data.success) {
          toast.success(res.data.message);
          navigate("/");
        } else {
          toast.error(res.data.message || "Failed to update password");
        }
      })
      .catch((err) => {
        console.error("API error:", err);
        toast.error(err.response?.data?.message || "Internal server error");
      });
  };

  return (
    <div className="wave-section">
      <AnimatedWave />

      <div
        className="form-container d-flex justify-content-center align-items-center border rounded"
        style={{ minHeight: "40vh", backgroundColor: "#ffffff" }}
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
            Reset Password
          </h2>
          <p className="text-center">
            Your previous password has been reset. Please set a new password for
            your account.
          </p>

          <form onSubmit={handleResetPassword}>
            <div className="mb-3">
              <label>New Password</label>
              <input
                onChange={handleNewPassword}
                className="form-control"
                type="password"
                placeholder="Enter your new password"
                required
              />
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
              Set Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
