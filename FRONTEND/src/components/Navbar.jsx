import React from "react";
import { Link } from "react-router-dom";
import "../Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="nav">
      
      {/* LEFT SIDE = LOGO + LINKS */}
      <div className="nav-left">
        <div className="nav-logo">HLTH</div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {/* Only show these if user is logged in */}
          {isAuthenticated && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/profile">My Profile</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* RIGHT SIDE = AUTH BUTTON */}
      <div className="nav-right">
        {!isAuthenticated ? (
          <Link to="/auth" className="signin-btn">Sign In</Link>
        ) : (
          <button className="logout-btn" onClick={logout}>Logout</button>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
