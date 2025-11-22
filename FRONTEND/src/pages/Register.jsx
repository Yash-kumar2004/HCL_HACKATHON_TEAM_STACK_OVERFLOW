import { useState } from "react";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [roleSel, setRoleSel] = useState("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!consent) return alert("Consent required");

    if (roleSel === "patient") {
      const res = await api.post("/user/register", { name, email, password });
      if (res.data.success) {
        login(res.data.token, "patient");
        navigate("/dashboard");
      } else alert(res.data.message);
    } else {
      alert("Provider register endpoint missing in backend.");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "24px auto" }}>
      <h2>Register</h2>

      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <select value={roleSel} onChange={(e) => setRoleSel(e.target.value)}>
          <option value="patient">Patient</option>
          <option value="provider">Provider</option>
        </select>

        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password"
               value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>
          <input type="checkbox" checked={consent}
                 onChange={(e) => setConsent(e.target.checked)} />
          I consent to data usage.
        </label>

        <button>Register</button>
      </form>
    </div>
  );
}
