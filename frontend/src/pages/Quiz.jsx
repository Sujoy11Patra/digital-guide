import React, { useState, useEffect } from "react";
import API from "../api";

const questions = [
  { q: "Which subject do you like most?", options: ["Technology", "Medical", "Commerce", "Government", "Teaching"] },
  { q: "What type of work do you prefer?", options: ["Technology", "Medical", "Commerce", "Government", "Teaching"] },
  { q: "Which skill is strongest for you?", options: ["Technology", "Medical", "Commerce", "Government", "Teaching"] },
  { q: "What is your dream field?", options: ["Technology", "Medical", "Commerce", "Government", "Teaching"] }
];

export default function Quiz() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [result, setResult] = useState(null);

  const choose = (i, value) => {
    const copy = [...answers];
    copy[i] = value;
    setAnswers(copy);
  };

  const submit = async () => {
    const res = await API.post("/student/quiz", { answers });
    setResult(res.data);
  };

  return <div className="box">
    <h1>Career Interest & Aptitude Assessment Quiz</h1>
    {questions.map((q, i) => <div className="card" key={i}>
      <h3>{q.q}</h3>
      {q.options.map(op => <label key={op}>
        <input type="radio" name={"q" + i} onChange={() => choose(i, op)} /> {op}
      </label>)}
    </div>)}
    <button onClick={submit}>Get Personalized Recommendation</button>
    {result && <div className="result">
      <h2>Recommended Career: {result.recommendation}</h2>
      <p>Interest Area: {result.interest}</p>
    </div>}
  </div>
}
