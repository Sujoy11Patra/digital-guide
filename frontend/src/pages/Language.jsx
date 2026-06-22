import React, { useState, useEffect } from "react";
import API from "../api";

export default function Language() {
  const [lang, setLang] = useState("English");
  const [data, setData] = useState({});

  const load = async () => {
    const res = await API.get("/student/language/" + lang);
    setData(res.data);
  };

  return <div className="box">
    <h1>Multilingual Support</h1>
    <select value={lang} onChange={e => setLang(e.target.value)}>
      <option>English</option>
      <option>Bengali</option>
      <option>Hindi</option>
    </select>
    <button onClick={load}>Apply Language</button>
    <div className="card">
      <h2>{data.welcome}</h2>
      <p>{data.quiz}</p>
      <p>{data.roadmap}</p>
    </div>
  </div>
}
