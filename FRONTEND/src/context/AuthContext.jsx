import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // fetch user from backend
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Try patient
        const p = await api.get("/user/me");
        if (p.data.success) {
          setUser(p.data.userData);
          setRole("patient");
          setLoading(false);
          return;
        }
      } catch {}

      // Try provider
      try {
        const pr = await api.get("/provider/profile");
        if (pr.data.success) {
          setUser(pr.data.profileData);
          setRole("provider");
        }
      } catch {}

      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = (tok, r) => {
    localStorage.setItem("token", tok);
    setToken(tok);
    setRole(r);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setRole(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, user, setUser, role, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
