import React, { useState, useEffect } from "react";
import API from "../api";

export default function Careers() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  const load = () => API.get("/student/careers?stream=" + filter).then(res => setData(res.data));
  useEffect(load, []);

  return <div className="box">
    <h1>Personalized Career Recommendations</h1>
    <select onChange={e => setFilter(e.target.value)}>
      <option value="">All Streams</option>
      <option>Science</option>
      <option>Commerce</option>
      <option>Arts</option>
    </select>
    <button onClick={load}>Filter</button>
    {data.map(x => <div className="card" key={x.id}>
      <h3>{x.title}</h3>
      <p><b>Stream:</b> {x.stream}</p>
      <p>{x.description}</p>
      <p><b>Subjects:</b> {x.subjects}</p>
      <p><b>Skills:</b> {x.skills}</p>
      <p><b>Salary:</b> {x.average_salary}</p>
      <p><b>Future Scope:</b> {x.future_scope}</p>
    </div>)}
  </div>
}
