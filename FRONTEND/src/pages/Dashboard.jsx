import { useEffect, useState } from "react";
import api from "../api";
import "./../styles/dashboard.css";

export default function Dashboard() {
  const [today, setToday] = useState({
    steps: 0,
    sleepHours: 0,
    exerciseHours: 0,
    waterIntakeMl: 0,
    date: new Date().toISOString().slice(0, 10)
  });

  const load = async () => {
    const res = await api.get("/user/dashboard");
    if (res.data.success) {
      setToday(res.data.today || today);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="dash-container">
      <h1>Welcome</h1>

      <div className="dash-grid">

        {/* Steps */}
        <div className="dash-card">
          <h3>Steps</h3>
          <p className="big-number">{today.steps} <span>/ 6000</span></p>

          <div className="progress">
            <div
              className="progress-fill"
              style={{ width: `${(today.steps / 6000) * 100}%` }}
            ></div>
          </div>

          <p className="percent">{Math.round((today.steps / 6000) * 100)}% completed</p>
        </div>

        {/* Active Time */}
        <div className="dash-card">
          <h3>Active Time</h3>
          <p className="big-number">{today.exerciseHours} hrs</p>

          <div className="progress">
            <div
              className="progress-fill orange"
              style={{ width: `${(today.exerciseHours / 1) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Sleep */}
        <div className="dash-card">
          <h3>Sleep</h3>
          <p className="big-number">{today.sleepHours} hrs</p>

          <div className="progress">
            <div
              className="progress-fill purple"
              style={{ width: `${(today.sleepHours / 8) * 100}%` }}
            ></div>
          </div>
        </div>

      </div>
    </div>
  );
}
