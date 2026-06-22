
import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return <div className="auth">
    <h1>Digital Guide Login</h1>
    <form onSubmit={submit} className="box small">
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button>Login</button>
      <p className="error">{error}</p>
      <p>New student? <Link to="/register">Register</Link></p>
      <p><b>Admin demo:</b> admin@gmail.com / admin123</p>
    </form>
  </div>
}
