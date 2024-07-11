import React from "react";

const DurationSelection = ({ onDurationChange }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onDurationChange(value);
  };

  return (
    <div className="form-step">
      <label>Select Duration</label>
      <select name="duration" onChange={handleChange} required>
        <option value="">Select duration</option>
        <option value="15">15 minutes</option>
        <option value="90">1 and half hour</option>
      </select>
    </div>
  );
};

export default DurationSelection;
