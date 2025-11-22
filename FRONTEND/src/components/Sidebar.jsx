import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Health</h2>

      <ul className="sidebar-menu">
        <li>Dashboard</li>
        <li>My Profile</li>
        <li>Wellness Goals</li>
        <li>Messages</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
