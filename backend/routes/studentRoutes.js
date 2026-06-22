const router = require("express").Router();
const db = require("../config/db");
const { auth } = require("../middleware/auth");

router.get("/dashboard", auth, async (req, res) => {
  const [[careers]] = await db.query("SELECT COUNT(*) as total FROM careers");
  const [[courses]] = await db.query("SELECT COUNT(*) as total FROM courses");
  const [[goals]] = await db.query("SELECT COUNT(*) as total FROM goals WHERE user_id=?", [req.user.id]);
  const [[completed]] = await db.query("SELECT COUNT(*) as total FROM goals WHERE user_id=? AND status='Completed'", [req.user.id]);
  res.json({ careers: careers.total, courses: courses.total, goals: goals.total, completedGoals: completed.total });
});

router.get("/careers", auth, async (req, res) => {
  const { stream, interest } = req.query;
  let sql = "SELECT * FROM careers WHERE 1=1";
  const params = [];
  if (stream) { sql += " AND stream LIKE ?"; params.push(`%${stream}%`); }
  if (interest) { sql += " AND interest_area LIKE ?"; params.push(`%${interest}%`); }
  const [rows] = await db.query(sql, params);
  res.json(rows);
});

router.get("/courses", auth, async (req, res) => {
  const [rows] = await db.query("SELECT c.*, ca.title AS career_title FROM courses c LEFT JOIN careers ca ON c.career_id=ca.id");
  res.json(rows);
});

router.get("/colleges", auth, async (req, res) => {
  const search = req.query.search || "";
  const [rows] = await db.query("SELECT * FROM colleges WHERE name LIKE ? OR location LIKE ? OR courses LIKE ?", [`%${search}%`, `%${search}%`, `%${search}%`]);
  res.json(rows);
});

router.get("/scholarships", auth, async (req, res) => {
  const [rows] = await db.query("SELECT * FROM scholarships ORDER BY deadline ASC");
  res.json(rows);
});

router.get("/exams", auth, async (req, res) => {
  const search = req.query.search || "";
  const [rows] = await db.query("SELECT * FROM exams WHERE name LIKE ? OR category LIKE ?", [`%${search}%`, `%${search}%`]);
  res.json(rows);
});

router.get("/admission-timeline", auth, async (req, res) => {
  const classLevel = req.query.class_level || "12";
  const [rows] = await db.query("SELECT * FROM admission_timelines WHERE class_level=? ORDER BY id", [classLevel]);
  res.json(rows);
});

router.get("/job-courses", auth, async (req, res) => {
  const [rows] = await db.query("SELECT * FROM job_courses");
  res.json(rows);
});

router.get("/certifications", auth, async (req, res) => {
  const [rows] = await db.query("SELECT * FROM certifications");
  res.json(rows);
});

router.post("/quiz", auth, async (req, res) => {
  const answers = req.body.answers || [];
  const count = {};
  answers.forEach(a => count[a] = (count[a] || 0) + 1);
  const interest = Object.keys(count).sort((a,b) => count[b] - count[a])[0] || "Technology";

  let recommendation = "Software Engineer";
  if (interest === "Medical") recommendation = "Doctor / Healthcare";
  if (interest === "Commerce") recommendation = "Chartered Accountant / Finance";
  if (interest === "Government") recommendation = "Civil Services Officer";
  if (interest === "Teaching") recommendation = "Teacher / Education";

  await db.query(
    "INSERT INTO quiz_results (user_id, interest_area, recommendation, score) VALUES (?,?,?,?)",
    [req.user.id, interest, recommendation, answers.length]
  );

  const [careers] = await db.query("SELECT * FROM careers WHERE interest_area LIKE ?", [`%${interest}%`]);
  res.json({ interest, recommendation, careers });
});

router.get("/stream-guidance/:classLevel", auth, (req, res) => {
  const data = {
    "10": [
      { stream: "Science", bestFor: "Engineering, Medical, Research, Technology", subjects: "Physics, Chemistry, Math/Biology, Computer" },
      { stream: "Commerce", bestFor: "CA, Banking, Finance, Business, Management", subjects: "Accountancy, Economics, Business Studies" },
      { stream: "Arts", bestFor: "Civil Services, Law, Teaching, Journalism, Design", subjects: "History, Geography, Political Science, Sociology" }
    ],
    "12": [
      { stream: "Science", bestFor: "B.Tech, MBBS, B.Sc, BCA, Diploma, Research" },
      { stream: "Commerce", bestFor: "B.Com, BBA, CA, CS, CMA, Banking" },
      { stream: "Arts", bestFor: "BA, Law, UPSC, Journalism, Design, B.Ed" }
    ]
  };
  res.json(data[req.params.classLevel] || data["10"]);
});

router.get("/subject-recommendation", auth, (req, res) => {
  const career = (req.query.career || "").toLowerCase();
  let subjects = ["English", "Computer", "Mathematics"];
  if (career.includes("doctor") || career.includes("medical")) subjects = ["Biology", "Chemistry", "Physics", "English"];
  if (career.includes("ca") || career.includes("finance")) subjects = ["Accountancy", "Economics", "Business Studies", "Mathematics"];
  if (career.includes("civil") || career.includes("upsc")) subjects = ["History", "Political Science", "Geography", "Economics"];
  res.json({ career: req.query.career, recommendedSubjects: subjects });
});

router.get("/roadmap/:career", auth, (req, res) => {
  const career = req.params.career.toLowerCase();
  let steps = [
    "Complete Class 10 with good marks",
    "Choose a suitable stream",
    "Complete Class 12",
    "Select degree/diploma course",
    "Build skills and projects",
    "Apply for internship",
    "Apply for job or higher study"
  ];
  if (career.includes("software")) steps = [
    "Choose Science or Computer-related path",
    "Learn C, Java, HTML, CSS and JavaScript",
    "Study DSA, OOP, DBMS and Computer Networks",
    "Learn React.js, Node.js, Express.js and MySQL",
    "Build 3 to 5 full-stack projects",
    "Practice coding on LeetCode and GFG",
    "Prepare resume and apply for Software Engineer roles"
  ];
  if (career.includes("doctor")) steps = [
    "Choose Science with Biology",
    "Prepare for NEET",
    "Complete Class 12 with PCB",
    "Get admission into MBBS/BDS/Nursing",
    "Complete internship/clinical training",
    "Apply for hospital or higher specialization"
  ];
  res.json({ career: req.params.career, steps });
});

router.get("/compare-careers", auth, async (req, res) => {
  const first = req.query.first || "";
  const second = req.query.second || "";
  const [rows] = await db.query("SELECT * FROM careers WHERE title LIKE ? OR title LIKE ?", [`%${first}%`, `%${second}%`]);
  res.json(rows);
});

router.post("/goals", auth, async (req, res) => {
  const { title, description, target_date } = req.body;
  await db.query("INSERT INTO goals (user_id,title,description,target_date) VALUES (?,?,?,?)", [req.user.id, title, description, target_date]);
  res.json({ message: "Goal added successfully" });
});

router.get("/goals", auth, async (req, res) => {
  const [rows] = await db.query("SELECT * FROM goals WHERE user_id=? ORDER BY id DESC", [req.user.id]);
  res.json(rows);
});

router.put("/goals/:id", auth, async (req, res) => {
  const { status, progress } = req.body;
  await db.query("UPDATE goals SET status=?, progress=? WHERE id=? AND user_id=?", [status, progress, req.params.id, req.user.id]);
  res.json({ message: "Goal updated successfully" });
});

router.get("/notifications", auth, async (req, res) => {
  const [rows] = await db.query("SELECT * FROM notifications WHERE user_id IS NULL OR user_id=? ORDER BY notify_date ASC", [req.user.id]);
  res.json(rows);
});

router.post("/chatbot", auth, (req, res) => {
  const msg = (req.body.message || "").toLowerCase();
  let reply = "I can help with career selection, stream selection, exams, courses, scholarships and roadmaps.";
  if (msg.includes("class 10")) reply = "After Class 10, choose Science for engineering/medical, Commerce for finance/business, and Arts for UPSC/law/teaching.";
  if (msg.includes("jee")) reply = "JEE Main is for engineering admission. Focus on Physics, Chemistry and Mathematics.";
  if (msg.includes("neet")) reply = "NEET UG is for medical courses like MBBS and BDS. Focus on Biology, Chemistry and Physics.";
  if (msg.includes("software")) reply = "For Software Engineer, learn DSA, Java, JavaScript, React, Node.js, Express.js, MySQL and build projects.";
  if (msg.includes("scholarship")) reply = "You can check NSP, SVMCM and Oasis scholarships based on eligibility.";
  res.json({ reply });
});

router.get("/language/:lang", auth, (req, res) => {
  const lang = req.params.lang;
  const dictionary = {
    English: { welcome: "Welcome to Digital Guide", quiz: "Career Quiz", roadmap: "Career Roadmap" },
    Bengali: { welcome: "ডিজিটাল গাইডে স্বাগতম", quiz: "ক্যারিয়ার কুইজ", roadmap: "ক্যারিয়ার রোডম্যাপ" },
    Hindi: { welcome: "डिजिटल गाइड में आपका स्वागत है", quiz: "करियर क्विज", roadmap: "करियर रोडमैप" }
  };
  res.json(dictionary[lang] || dictionary.English);
});

module.exports = router;
