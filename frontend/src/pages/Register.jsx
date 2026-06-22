import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", class_level: "10", preferred_language: "English" });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    alert("Registration successful");
    location.href = "/login";
  };

  return <div className="auth">
    <h1>Student Registration</h1>
    <form onSubmit={submit} className="box small">
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <select onChange={e => setForm({ ...form, class_level: e.target.value })}>
        <option value="10">Class 10</option>
        <option value="12">Class 12</option>
      </select>
      <select onChange={e => setForm({ ...form, preferred_language: e.target.value })}>
        <option>English</option>
        <option>Bengali</option>
        <option>Hindi</option>
      </select>
      <button>Register</button>
      <p>Already have account? <Link to="/login">Login</Link></p>
    </form>
  </div>
}
