const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM resources", (err, result) => {
    if (err) {
      return res.status(500).json({ message: "DB Error" });
    }
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { title, description, link, user_id, category_id } = req.body;

  if (!title || !description || !link) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql =
    "INSERT INTO resources (title, description, link, user_id, category_id) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [title, description, link, user_id || 1, category_id || 1],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Insert Error" });
      }

      res.json({
        message: "Resource Added",
        id: result.insertId,
      });
    }
  );
});

module.exports = router;