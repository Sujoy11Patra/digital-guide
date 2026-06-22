import React, { useState, useEffect } from "react";
import API from "../api";

export default function Timeline() {
  const [classLevel, setClassLevel] = useState("12");
  const [data, setData] = useState([]);

  const load = async () => {
    const res = await API.get("/student/admission-timeline?class_level=" + classLevel);
    setData(res.data);
  };

  return <div className="box">
    <h1>College Admission Timeline and Important Dates</h1>
    <select value={classLevel} onChange={e => setClassLevel(e.target.value)}>
      <option value="10">Class 10</option>
      <option value="12">Class 12</option>
    </select>
    <button onClick={load}>Show Timeline</button>
    {data.map(x => <div className="card" key={x.id}>
      <h3>{x.title}</h3>
      <p><b>Month:</b> {x.month_name}</p>
      <p>{x.description}</p>
    </div>)}
  </div>
}
