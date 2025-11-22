import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { token, role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <div>Forbidden</div>;

  return children;
}
