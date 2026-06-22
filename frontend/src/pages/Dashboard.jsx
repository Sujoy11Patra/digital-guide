import React, { useState, useEffect } from "react";

import API from "../api";

export default function Dashboard() {
  const [data, setData] = useState({});
  useEffect(() => { API.get("/student/dashboard").then(res => setData(res.data)); }, []);

  return <div className="box">
    <h1>Academic Progress Tracking Dashboard</h1>
    <p>Welcome to Digital Guide Career Guidance Platform.</p>
    <div className="grid">
      <div className="card"><h2>{data.careers}</h2><p>Career Options</p></div>
      <div className="card"><h2>{data.courses}</h2><p>Courses</p></div>
      <div className="card"><h2>{data.goals}</h2><p>Total Goals</p></div>
      <div className="card"><h2>{data.completedGoals}</h2><p>Completed Goals</p></div>
    </div>
  </div>
}
