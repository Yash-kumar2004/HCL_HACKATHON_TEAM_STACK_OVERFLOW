import { useEffect, useState } from "react";
import api from "../api";

export default function ProviderDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/provider/appointments");
      if (res.data.success) setAppointments(res.data.appointments);
    };
    load();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "24px auto" }}>
      <h2>Provider Dashboard</h2>
      <ul>
        {appointments.map((a) => (
          <li key={a._id}>
            {a.slotDate} {a.slotTime} — Patient: {a.userData?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
