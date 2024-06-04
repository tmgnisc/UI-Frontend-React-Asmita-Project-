import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerApi } from "../apis/Api";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const handleChangeProfileImage = (e) => setProfileImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profileImage', profileImage);

    try {
      const res = await registerApi(formData);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('Internal Server Error!');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register to Mann Ko Bhawana</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="profile-image-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleChangeProfileImage}
              className="profile-image-input"
            />
            <div className="profile-image-placeholder">
              {profileImage ? (
                <img src={URL.createObjectURL(profileImage)} alt="Profile" className="profile-image-preview" />
              ) : (
                <span className="profile-image-icon">+</span>
              )}
            </div>
          </div>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleChangeUsername}
            className="register-input"
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChangeEmail}
            className="register-input"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChangePassword}
            className="register-input"
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            className="register-input"
            required
          />
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <div className="register-footer">
          Already have an account? <a href="/login">Login!</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
