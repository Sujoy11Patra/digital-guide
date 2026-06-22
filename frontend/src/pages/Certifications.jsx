import React, { useState, useEffect } from "react";
import API from "../api";

export default function Certifications() {
  const [data, setData] = useState([]);
  useEffect(() => { API.get("/student/certifications").then(res => setData(res.data)); }, []);

  return <div className="box">
    <h1>Professional Certification Recommendations</h1>
    {data.map(x => <div className="card" key={x.id}>
      <h3>{x.title}</h3>
      <p><b>Provider:</b> {x.provider}</p>
      <p><b>Category:</b> {x.category}</p>
      <p>{x.description}</p>
      <a href={x.link} target="_blank">Open</a>
    </div>)}
  </div>
}
