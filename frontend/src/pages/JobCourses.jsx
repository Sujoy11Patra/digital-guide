import React, { useState, useEffect } from "react";
import API from "../api";

export default function JobCourses() {
  const [data, setData] = useState([]);
  useEffect(() => { API.get("/student/job-courses").then(res => setData(res.data)); }, []);

  return <div className="box">
    <h1>Job-Oriented Course Recommendations</h1>
    {data.map(x => <div className="card" key={x.id}>
      <h3>{x.title}</h3>
      <p><b>Category:</b> {x.category}</p>
      <p><b>Duration:</b> {x.duration}</p>
      <p><b>Skills:</b> {x.skills}</p>
      <p>{x.description}</p>
    </div>)}
  </div>
}
