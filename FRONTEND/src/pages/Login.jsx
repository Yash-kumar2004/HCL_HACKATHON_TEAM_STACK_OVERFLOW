import { useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleSel, setRoleSel] = useState("patient");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const endpoint = roleSel === "provider" ? "/provider/login" : "/user/login";

    try {
      const res = await api.post(endpoint, { email, password });
      if (res.data.success) {
        login(res.data.token, roleSel);
        navigate(roleSel === "patient" ? "/dashboard" : "/provider/dashboard");
      } else {
        alert(res.data.message);
      }
    } catch {
      alert("Server error");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "24px auto" }}>
      <h2>Login</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <select value={roleSel} onChange={(e) => setRoleSel(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="provider">Provider</option>
        </select>

        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password"
               value={password} onChange={(e) => setPassword(e.target.value)} />

        <button>Login</button>
      </form>
    </div>
  );
}
