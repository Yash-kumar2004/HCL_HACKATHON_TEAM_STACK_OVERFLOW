import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProvidersList from "./pages/ProvidersList";
import BookAppointment from "./pages/BookAppointment";
import MyAppointments from "./pages/MyAppointments";
import ProviderDashboard from "./pages/ProviderDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["patient"]}><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/providers" element={<ProtectedRoute><ProvidersList /></ProtectedRoute>} />
          <Route path="/book/:id" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute><MyAppointments /></ProtectedRoute>} />

          <Route path="/provider/dashboard" element={<ProtectedRoute allowedRoles={["provider"]}><ProviderDashboard /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
