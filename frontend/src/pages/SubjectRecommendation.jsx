import React, { useState, useEffect } from "react";
import API from "../api";

export default function SubjectRecommendation() {
  const [career, setCareer] = useState("Software Engineer");
  const [subjects, setSubjects] = useState([]);

  const getSubjects = async () => {
    const res = await API.get("/student/subject-recommendation?career=" + career);
    setSubjects(res.data.recommendedSubjects);
  };

  return <div className="box">
    <h1>Subject Recommendation System</h1>
    <input value={career} onChange={e => setCareer(e.target.value)} placeholder="Enter career name" />
    <button onClick={getSubjects}>Recommend Subjects</button>
    {subjects.map((s, i) => <div className="card" key={i}>{s}</div>)}
  </div>
}
