import { useEffect, useState } from "react";
import api from "../api";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const res = await api.get("/user/appointments");
        if (res.data.success) {
          setAppointments(res.data.appointments);
        }
      } catch (err) {
        console.error("Error loading appointments:", err);
      }
    };

    loadAppointments();
  }, []);

  return (
    <div>
      <h2>My Appointments</h2>

      {appointments.length === 0 && <p>No appointments booked yet.</p>}

      <ul>
        {appointments.map((a) => (
          <li key={a._id}>
            <strong>{a.pData?.name}</strong>  
            <br />
            Date: {a.slotDate}  
            <br />
            Time: {a.slotTime}
          </li>
        ))}
      </ul>
    </div>
  );
}
