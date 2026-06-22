import React, { useState, useEffect } from "react";
import API from "../api";

export default function CompareCareers() {
  const [first, setFirst] = useState("Software Engineer");
  const [second, setSecond] = useState("Doctor");
  const [data, setData] = useState([]);

  const compare = async () => {
    const res = await API.get(`/student/compare-careers?first=${first}&second=${second}`);
    setData(res.data);
  };

  return <div className="box">
    <h1>Career Option Comparison Tool</h1>
    <input value={first} onChange={e => setFirst(e.target.value)} />
    <input value={second} onChange={e => setSecond(e.target.value)} />
    <button onClick={compare}>Compare</button>
    <div className="grid">
      {data.map(x => <div className="card" key={x.id}>
        <h3>{x.title}</h3>
        <p><b>Stream:</b> {x.stream}</p>
        <p><b>Skills:</b> {x.skills}</p>
        <p><b>Salary:</b> {x.average_salary}</p>
        <p>{x.future_scope}</p>
      </div>)}
    </div>
  </div>
}
