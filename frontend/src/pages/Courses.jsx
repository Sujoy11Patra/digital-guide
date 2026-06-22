import React, { useState, useEffect } from "react";
import API from "../api";

export default function Courses() {
  const [data, setData] = useState([]);
  useEffect(() => { API.get("/student/courses").then(res => setData(res.data)); }, []);

  return <div className="box">
    <h1>Course and Degree Exploration</h1>
    {data.map(x => <div className="card" key={x.id}>
      <h3>{x.title}</h3>
      <p><b>Category:</b> {x.category}</p>
      <p><b>Eligibility:</b> {x.eligibility}</p>
      <p><b>Duration:</b> {x.duration}</p>
      <p>{x.description}</p>
    </div>)}
  </div>
}
