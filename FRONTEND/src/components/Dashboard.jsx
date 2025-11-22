import React from "react";
import Navbar from "./Navbar";
import Wellness from "./Wellness";
import "../Dashboard.css";

const Dashboard = ({ isLoggedIn, onLogout }) => {
  const preventiveReminder = "Upcoming: Annual blood test on 23rd Jan 2025";
  const healthTip = "Stay hydrated. Aim for at least 8 glasses of water per day.";

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="dashboard-wrapper">
        
        {/* LEFT MAIN BOX */}
        <div className="left-box">
          <h2 className="left-title">Preventive Care Reminders</h2>
          <ul className="reminder-list">
            <li>{preventiveReminder}</li>
          </ul>

          <h2 className="left-title">Health Tip of the Day</h2>
          <p className="tip-text">{healthTip}</p>
        </div>

        {/* RIGHT WELLNESS SECTION */}
        <div className="right-box">
          <h2 className="wellness-title">Wellness Goals</h2>
          <div className="wellness-row">
            <Wellness />
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
