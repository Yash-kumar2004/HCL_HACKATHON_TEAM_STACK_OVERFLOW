import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const { token, user, role, logout } = useAuth();

  return (
    <nav className="nav">
      <div className="nav-left">Healthcare Portal</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/providers">Providers</Link>

        {token ? (
          <>
            {role === "patient" && <Link to="/dashboard">Dashboard</Link>}
            {role === "patient" && <Link to="/appointments">My Appointments</Link>}
            <Link to="/profile">Profile</Link>
            <a onClick={logout} className="logout">Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
