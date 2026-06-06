require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

app.post("/api/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email and password are required"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = `
    INSERT INTO users (username, email, password_hash)
    VALUES (?, ?, ?)
    `;
  
    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Signup failed",
          error: err
        });
      }

      res.status(201).json({
        message: "User created successfully",
        user: {
          user_id: result.insertId,
          username,
          email
        }
      });
    });
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
