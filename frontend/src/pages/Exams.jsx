import React, { useState, useEffect } from "react";
import API from "../api";

export default function Exams() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const load = () => API.get("/student/exams?search=" + search).then(res => setData(res.data));
  useEffect(load, []);

  return <div className="box">
    <h1>Entrance Exam Guidance</h1>
    <input placeholder="Search JEE, NEET, WBJEE, CUET..." onChange={e => setSearch(e.target.value)} />
    <button onClick={load}>Search</button>
    {data.map(x => <div className="card" key={x.id}>
      <h3>{x.name}</h3>
      <p>{x.description}</p>
      <p><b>Category:</b> {x.category}</p>
      <p><b>Eligibility:</b> {x.eligibility}</p>
      <p><b>Exam Month:</b> {x.exam_month}</p>
      <a href={x.website} target="_blank">Official Website</a>
    </div>)}
  </div>
}
