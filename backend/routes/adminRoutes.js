const router = require("express").Router();
const db = require("../config/db");
const { auth, adminOnly } = require("../middleware/auth");

router.use(auth, adminOnly);

router.get("/stats", async (req, res) => {
  const [[users]] = await db.query("SELECT COUNT(*) total FROM users");
  const [[careers]] = await db.query("SELECT COUNT(*) total FROM careers");
  const [[colleges]] = await db.query("SELECT COUNT(*) total FROM colleges");
  const [[exams]] = await db.query("SELECT COUNT(*) total FROM exams");
  res.json({ users: users.total, careers: careers.total, colleges: colleges.total, exams: exams.total });
});

function crudRoutes(table, fields) {
  router.get(`/${table}`, async (req, res) => {
    const [rows] = await db.query(`SELECT * FROM ${table} ORDER BY id DESC`);
    res.json(rows);
  });

  router.post(`/${table}`, async (req, res) => {
    const values = fields.map(f => req.body[f] || null);
    const placeholders = fields.map(() => "?").join(",");
    await db.query(`INSERT INTO ${table} (${fields.join(",")}) VALUES (${placeholders})`, values);
    res.json({ message: `${table} added successfully` });
  });

  router.delete(`/${table}/:id`, async (req, res) => {
    await db.query(`DELETE FROM ${table} WHERE id=?`, [req.params.id]);
    res.json({ message: `${table} deleted successfully` });
  });
}

crudRoutes("careers", ["title","stream","interest_area","description","subjects","skills","average_salary","future_scope"]);
crudRoutes("courses", ["title","category","eligibility","duration","description","career_id"]);
crudRoutes("colleges", ["name","location","courses","fees","website"]);
crudRoutes("scholarships", ["title","eligibility","amount","deadline","link"]);
crudRoutes("exams", ["name","category","eligibility","exam_month","website","description"]);
crudRoutes("notifications", ["user_id","title","message","notify_date","type"]);
crudRoutes("certifications", ["title","provider","category","link","description"]);
crudRoutes("job_courses", ["title","category","duration","skills","description"]);

module.exports = router;
