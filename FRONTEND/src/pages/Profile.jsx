import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import api from "../api";

export default function Profile() {
  const { user, setUser, role } = useAuth();
  const [form, setForm] = useState({});

  useEffect(() => { if (user) setForm(user); }, [user]);

  if (role === "provider") return <div>Provider profile handled separately.</div>;

  const save = async () => {
    const res = await api.post("/user/me", form);
    if (res.data.success) {
      const me = await api.get("/user/me");
      setUser(me.data.userData);
      alert("Updated");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "24px auto" }}>
      <h2>Edit Profile</h2>

      <input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <input value={form.address || ""} onChange={(e) => setForm({ ...form, address: e.target.value })} />

      <input type="date" value={form.dob || ""} onChange={(e) => setForm({ ...form, dob: e.target.value })} />

      <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
        <option>Not Selected</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <h3>Goals</h3>
      <input placeholder="Sleep goals" value={form.sleep_goals || ""}
             onChange={(e) => setForm({ ...form, sleep_goals: e.target.value })} />

      <input placeholder="Walking goals" value={form.walking_goals || ""}
             onChange={(e) => setForm({ ...form, walking_goals: e.target.value })} />

      <input placeholder="Water goals" value={form.water_goals || ""}
             onChange={(e) => setForm({ ...form, water_goals: e.target.value })} />

      <button onClick={save}>Save</button>
    </div>
  );
}
