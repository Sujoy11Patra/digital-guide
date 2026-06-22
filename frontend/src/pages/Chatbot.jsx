import React, { useState, useEffect } from "react";
import API from "../api";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const send = async () => {
    const res = await API.post("/student/chatbot", { message });
    setChat([...chat, { me: message, bot: res.data.reply }]);
    setMessage("");
  };

  return <div className="box">
    <h1>AI-powered Career Counselor Chatbot</h1>
    <div className="chat">
      {chat.map((c, i) => <div className="card" key={i}>
        <p><b>You:</b> {c.me}</p>
        <p><b>Bot:</b> {c.bot}</p>
      </div>)}
    </div>
    <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Ask career question..." />
    <button onClick={send}>Send</button>
  </div>
}
