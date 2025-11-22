import React, { useState } from "react";
import "../Wellness.css";

const Wellness = () => {
  // ----- UPPER LIMIT VALUES -----
  const MAX_STEPS = 6000;
  const MAX_ACTIVE_MIN = 60;
  const MAX_SLEEP_MIN = 480; // 8 hours = 480 mins

  // ----- USER INPUT VALUES -----
  const [steps, setSteps] = useState(3620);
  const [activeTime, setActiveTime] = useState(56);
  const [sleepTime, setSleepTime] = useState(390); // 6h 30m

  // Calculate percentages
  const stepsPercent = Math.min((steps / MAX_STEPS) * 100, 100);
  const activePercent = Math.min((activeTime / MAX_ACTIVE_MIN) * 100, 100);
  const sleepPercent = Math.min((sleepTime / MAX_SLEEP_MIN) * 100, 100);

  return (
    <div className="wellness-container">

      {/* Steps Card */}
      <div className="wellness-card">
        <h3>Steps</h3>
        <div className="value-row">
          <span>{steps}</span>
          <span className="limit">/{MAX_STEPS} steps</span>
        </div>

        <input
          type="number"
          value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
          className="input-box"
        />

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${stepsPercent}%` }}
          ></div>
        </div>

        <p className="percent-text">{Math.floor(stepsPercent)}%</p>
      </div>

      {/* Active Time Card */}
      <div className="wellness-card">
        <h3>Active Time</h3>
        <div className="value-row">
          <span>{activeTime} mins</span>
          <span className="limit">/{MAX_ACTIVE_MIN} mins</span>
        </div>

        <input
          type="number"
          value={activeTime}
          onChange={(e) => setActiveTime(Number(e.target.value))}
          className="input-box"
        />

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${activePercent}%` }}
          ></div>
        </div>

        <p className="percent-text">{Math.floor(activePercent)}%</p>
      </div>

      {/* Sleep Card */}
      <div className="wellness-card">
        <h3>Sleep</h3>
        <div className="value-row">
          <span>{Math.floor(sleepTime / 60)}h {sleepTime % 60}m</span>
          <span className="limit">
            /{MAX_SLEEP_MIN / 60} hrs
          </span>
        </div>

        <input
          type="number"
          value={sleepTime}
          onChange={(e) => setSleepTime(Number(e.target.value))}
          className="input-box"
        />

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${sleepPercent}%` }}
          ></div>
        </div>

        <p className="percent-text">{Math.floor(sleepPercent)}%</p>
      </div>
    </div>
  );
};

export default Wellness;
