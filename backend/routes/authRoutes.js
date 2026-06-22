const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { auth } = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, class_level, preferred_language } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });
    const hash = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (name,email,password,class_level,preferred_language) VALUES (?,?,?,?,?)",
      [name, email, hash, class_level || "10", preferred_language || "English"]
    );
    res.json({ message: "Student registration successful" });
  } catch (err) {
    res.status(400).json({ message: "Email already exists or invalid data" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await db.query("SELECT * FROM users WHERE email=?", [email]);
  if (!rows.length) return res.status(400).json({ message: "Invalid email or password" });

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid email or password" });

  const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      class_level: user.class_level,
      preferred_language: user.preferred_language
    }
  });
});

router.get("/profile", auth, async (req, res) => {
  const [rows] = await db.query("SELECT id,name,email,role,class_level,stream,preferred_language,phone,address FROM users WHERE id=?", [req.user.id]);
  res.json(rows[0]);
});

router.put("/profile", auth, async (req, res) => {
  const { name, class_level, stream, preferred_language, phone, address } = req.body;
  await db.query(
    "UPDATE users SET name=?, class_level=?, stream=?, preferred_language=?, phone=?, address=? WHERE id=?",
    [name, class_level, stream, preferred_language, phone, address, req.user.id]
  );
  res.json({ message: "Profile updated successfully" });
});

module.exports = router;
