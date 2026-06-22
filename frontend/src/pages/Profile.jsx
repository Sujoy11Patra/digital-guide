import React, { useState, useEffect } from "react";
import API from "../api";

export default function Profile() {
  const [form, setForm] = useState({});

  useEffect(() => { API.get("/auth/profile").then(res => setForm(res.data)); }, []);

  const save = async () => {
    await API.put("/auth/profile", form);
    alert("Profile updated");
  };

  return <div className="box">
    <h1>Student Profile Management</h1>
    <input value={form.name || ""} placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
    <input value={form.phone || ""} placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
    <input value={form.address || ""} placeholder="Address" onChange={e => setForm({ ...form, address: e.target.value })} />
    <select value={form.class_level || "10"} onChange={e => setForm({ ...form, class_level: e.target.value })}>
      <option value="10">Class 10</option>
      <option value="12">Class 12</option>
    </select>
    <select value={form.stream || ""} onChange={e => setForm({ ...form, stream: e.target.value })}>
      <option value="">Select Stream</option>
      <option>Science</option>
      <option>Commerce</option>
      <option>Arts</option>
    </select>
    <select value={form.preferred_language || "English"} onChange={e => setForm({ ...form, preferred_language: e.target.value })}>
      <option>English</option>
      <option>Bengali</option>
      <option>Hindi</option>
    </select>
    <button onClick={save}>Save Profile</button>
  </div>
}
