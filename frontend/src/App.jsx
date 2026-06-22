
import React from "react";

import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Quiz from "./pages/Quiz.jsx";
import StreamGuidance from "./pages/StreamGuidance.jsx";
import SubjectRecommendation from "./pages/SubjectRecommendation.jsx";
import Careers from "./pages/Careers.jsx";
import Courses from "./pages/Courses.jsx";
import Colleges from "./pages/Colleges.jsx";
import Scholarships from "./pages/Scholarships.jsx";
import Exams from "./pages/Exams.jsx";
import Roadmap from "./pages/Roadmap.jsx";
import Goals from "./pages/Goals.jsx";
import CompareCareers from "./pages/CompareCareers.jsx";
import JobCourses from "./pages/JobCourses.jsx";
import Certifications from "./pages/Certifications.jsx";
import Timeline from "./pages/Timeline.jsx";
import Notifications from "./pages/Notifications.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import Language from "./pages/Language.jsx";
import Admin from "./pages/Admin.jsx";

function Private({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

function Nav() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const logout = () => { localStorage.clear(); location.href = "/login"; };
  if (!localStorage.getItem("token")) return null;

  return (
    <nav>
      <h2>Digital Guide</h2>
      <Link to="/">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/quiz">Quiz</Link>
      <Link to="/stream">Stream</Link>
      <Link to="/subjects">Subjects</Link>
      <Link to="/careers">Careers</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/colleges">Colleges</Link>
      <Link to="/scholarships">Scholarships</Link>
      <Link to="/exams">Exams</Link>
      <Link to="/roadmap">Roadmap</Link>
      <Link to="/goals">Goals</Link>
      <Link to="/compare">Compare</Link>
      <Link to="/job-courses">Job Courses</Link>
      <Link to="/certifications">Certifications</Link>
      <Link to="/timeline">Timeline</Link>
      <Link to="/notifications">Notifications</Link>
      <Link to="/language">Language</Link>
      <Link to="/chatbot">Chatbot</Link>
      {user.role === "admin" && <Link to="/admin">Admin</Link>}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Private><Dashboard /></Private>} />
        <Route path="/profile" element={<Private><Profile /></Private>} />
        <Route path="/quiz" element={<Private><Quiz /></Private>} />
        <Route path="/stream" element={<Private><StreamGuidance /></Private>} />
        <Route path="/subjects" element={<Private><SubjectRecommendation /></Private>} />
        <Route path="/careers" element={<Private><Careers /></Private>} />
        <Route path="/courses" element={<Private><Courses /></Private>} />
        <Route path="/colleges" element={<Private><Colleges /></Private>} />
        <Route path="/scholarships" element={<Private><Scholarships /></Private>} />
        <Route path="/exams" element={<Private><Exams /></Private>} />
        <Route path="/roadmap" element={<Private><Roadmap /></Private>} />
        <Route path="/goals" element={<Private><Goals /></Private>} />
        <Route path="/compare" element={<Private><CompareCareers /></Private>} />
        <Route path="/job-courses" element={<Private><JobCourses /></Private>} />
        <Route path="/certifications" element={<Private><Certifications /></Private>} />
        <Route path="/timeline" element={<Private><Timeline /></Private>} />
        <Route path="/notifications" element={<Private><Notifications /></Private>} />
        <Route path="/language" element={<Private><Language /></Private>} />
        <Route path="/chatbot" element={<Private><Chatbot /></Private>} />
        <Route path="/admin" element={<Private><Admin /></Private>} />
      </Routes>
    </>
  );
}
