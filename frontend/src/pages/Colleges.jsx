import React, { useState, useEffect } from "react";
import API from "../api";

export default function Colleges() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const load = () => API.get("/student/colleges?search=" + search).then(res => setData(res.data));
  useEffect(load, []);

  return <div className="box">
    <h1>College Search and Information Module</h1>
    <input placeholder="Search college/location/course" onChange={e => setSearch(e.target.value)} />
    <button onClick={load}>Search</button>
    {data.map(x => <div className="card" key={x.id}>
      <h3>{x.name}</h3>
      <p>{x.location}</p>
      <p><b>Courses:</b> {x.courses}</p>
      <p><b>Fees:</b> {x.fees}</p>
      <a href={x.website} target="_blank">Website</a>
    </div>)}
  </div>
}
