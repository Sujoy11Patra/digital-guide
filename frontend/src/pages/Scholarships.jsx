import React, { useState, useEffect } from "react";
import API from "../api";

export default function Scholarships() {
  const [data, setData] = useState([]);
  useEffect(() => { API.get("/student/scholarships").then(res => setData(res.data)); }, []);

  return <div className="box">
    <h1>Scholarship and Financial Aid Information</h1>
    {data.map(x => <div className="card" key={x.id}>
      <h3>{x.title}</h3>
      <p><b>Eligibility:</b> {x.eligibility}</p>
      <p><b>Amount:</b> {x.amount}</p>
      <p><b>Deadline:</b> {x.deadline}</p>
      <a href={x.link} target="_blank">Apply / Visit</a>
    </div>)}
  </div>
}
