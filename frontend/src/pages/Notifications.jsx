import React, { useState, useEffect } from "react";
import API from "../api";

export default function Notifications() {
  const [data, setData] = useState([]);
  useEffect(() => { API.get("/student/notifications").then(res => setData(res.data)); }, []);

  return <div className="box">
    <h1>Notification System</h1>
    {data.map(x => <div className="card" key={x.id}>
      <h3>{x.title}</h3>
      <p>{x.message}</p>
      <p><b>Date:</b> {x.notify_date}</p>
      <p><b>Type:</b> {x.type}</p>
    </div>)}
  </div>
}
