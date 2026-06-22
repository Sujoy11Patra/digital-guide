import React, { useState, useEffect } from "react";
import API from "../api";

export default function Admin() {
  const [stats, setStats] = useState({});
  const [career, setCareer] = useState({
    title: "", stream: "Science", interest_area: "Technology", description: "",
    subjects: "", skills: "", average_salary: "", future_scope: ""
  });
  const [notification, setNotification] = useState({ title: "", message: "", notify_date: "", type: "Exam" });

  useEffect(() => { API.get("/admin/stats").then(res => setStats(res.data)); }, []);

  const addCareer = async () => {
    await API.post("/admin/careers", career);
    alert("Career added");
  };

  const addNotification = async () => {
    await API.post("/admin/notifications", notification);
    alert("Notification added");
  };

  return <div className="box">
    <h1>Admin Panel</h1>
    <div className="grid">
      <div className="card">Users: {stats.users}</div>
      <div className="card">Careers: {stats.careers}</div>
      <div className="card">Colleges: {stats.colleges}</div>
      <div className="card">Exams: {stats.exams}</div>
    </div>

    <h2>Add Career</h2>
    {Object.keys(career).map(k => <input key={k} placeholder={k} value={career[k]} onChange={e => setCareer({ ...career, [k]: e.target.value })} />)}
    <button onClick={addCareer}>Add Career</button>

    <h2>Add Notification</h2>
    <input placeholder="Title" onChange={e => setNotification({ ...notification, title: e.target.value })} />
    <input placeholder="Message" onChange={e => setNotification({ ...notification, message: e.target.value })} />
    <input type="date" onChange={e => setNotification({ ...notification, notify_date: e.target.value })} />
    <input placeholder="Type" onChange={e => setNotification({ ...notification, type: e.target.value })} />
    <button onClick={addNotification}>Add Notification</button>
  </div>
}
