import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function BookAppointment() {
  const { id } = useParams(); // provider id
  const navigate = useNavigate();

  const [slotDate, setSlotDate] = useState("");
  const [slotTime, setSlotTime] = useState("");

  const bookNow = async () => {
    try {
      const res = await api.post("/user/appointment", {
        proid: id,
        slotDate,
        slotTime
      });

      if (res.data.success) {
        alert("Appointment Booked!");
        navigate("/appointments");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("Booking failed");
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>

      <label>Date:</label>
      <input type="date" value={slotDate} onChange={(e) => setSlotDate(e.target.value)} />

      <label>Time:</label>
      <input type="time" value={slotTime} onChange={(e) => setSlotTime(e.target.value)} />

      <button onClick={bookNow}>Confirm Booking</button>
    </div>
  );
}
