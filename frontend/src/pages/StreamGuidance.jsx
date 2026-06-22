import React, { useState, useEffect } from "react";
import API from "../api";

export default function StreamGuidance() {
  const [classLevel, setClassLevel] = useState("10");
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await API.get("/student/stream-guidance/" + classLevel);
    setData(res.data);
  };

  return <div className="box">
    <h1>Stream Selection Guidance after Class 10</h1>
    <select value={classLevel} onChange={e => setClassLevel(e.target.value)}>
      <option value="10">Class 10</option>
      <option value="12">Class 12</option>
    </select>
    <button onClick={getData}>Show Guidance</button>
    {data.map((x, i) => <div className="card" key={i}>
      <h3>{x.stream}</h3>
      <p><b>Best For:</b> {x.bestFor}</p>
      {x.subjects && <p><b>Subjects:</b> {x.subjects}</p>}
    </div>)}
  </div>
}
