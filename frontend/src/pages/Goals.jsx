import React, { useState, useEffect } from "react";
import API from "../api";

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", target_date: "" });

  const load = () => API.get("/student/goals").then(res => setGoals(res.data));
  useEffect(load, []);

  const add = async () => {
    await API.post("/student/goals", form);
    setForm({ title: "", description: "", target_date: "" });
    load();
  };

  const update = async (id, status, progress) => {
    await API.put("/student/goals/" + id, { status, progress });
    load();
  };

  return <div className="box">
    <h1>Goal Setting and Milestone Tracking</h1>
    <input placeholder="Goal title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
    <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
    <input type="date" value={form.target_date} onChange={e => setForm({ ...form, target_date: e.target.value })} />
    <button onClick={add}>Add Goal</button>

    {goals.map(g => <div className="card" key={g.id}>
      <h3>{g.title}</h3>
      <p>{g.description}</p>
      <p><b>Status:</b> {g.status} | <b>Progress:</b> {g.progress}%</p>
      <button onClick={() => update(g.id, "In Progress", 50)}>In Progress</button>
      <button onClick={() => update(g.id, "Completed", 100)}>Completed</button>
    </div>)}
  </div>
}
