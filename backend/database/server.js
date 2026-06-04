require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed");
    console.error(err);
  } else {
    console.log("Connected to MYSQL");
  }
});

app.get("/", (req, res) => {
  res.send("CleanUp Quest API running");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend" });
});

app.get("/leaderboard", (req, res) => {
  const sql = `
    SELECT
    user_id,
    username,
    points,
    streak
    FROM users
    ORDER BY points DESC
    `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

// Route to add hotspot
app.post("/api/hotspots", (req, res) => {
  console.log("Received", req.body);

  const { lat, lng, description, status } = req.body;

  const sql = `
    INSERT INTO hotspots (lat, lng, description, status)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [lat, lng, description, status], (err, result) => {
    if (err) {
      console.log("sql error");
      console.log(err); //
      return res.status(500).json(err);
    }

    console.log("success", result);

    res.json({
      id: result.insertId,
      lat,
      lng,
      description,
      status,
    });
  });
});

//Route to show hotspots

app.get("/api/hotspots", (req, res) => {
  db.query("SELECT * FROM hotspots", (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

// Route to update hotspot
app.put("/api/hotspots/:id/clean", (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE hotspots
    SET status = 'cleaned'
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json({
      message: "Hotspot marked as cleaned",
      id,
    });
  });
});
