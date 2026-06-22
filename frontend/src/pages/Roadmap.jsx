import React, { useState, useEffect } from "react";
import API from "../api";

export default function Roadmap() {
  const [career, setCareer] = useState("Software Engineer");
  const [steps, setSteps] = useState([]);

  const generate = async () => {
    const res = await API.get("/student/roadmap/" + career);
    setSteps(res.data.steps);
  };

  return <div className="box">
    <h1>Career Roadmap Generator</h1>
    <input value={career} onChange={e => setCareer(e.target.value)} />
    <button onClick={generate}>Generate Roadmap</button>
    {steps.map((s, i) => <div className="card" key={i}><b>Step {i + 1}:</b> {s}</div>)}
  </div>
}
