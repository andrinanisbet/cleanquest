require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

//auth middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
}

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

//Sign up route
app.post("/api/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email and password are required",
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
        error: err,
      });
    }

    res.status(201).json({
      message: "User created successfully",
      user: {
        user_id: result.insertId,
        username,
        email,
      },
    });
  });
});

//Login route
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter email address and password",
    });
  }

  const sql = `
    SELECT * FROM users
    WHERE email = ?
    `;

  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Login failed",
        error: err,
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const user = results[0];

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
      },
    });
  });
});

//Protected current user route
app.get("/api/auth/me", authMiddleware, (req, res) => {
  const sql = `
    SELECT user_id, username, email, points, streak, last_cleanup_date, created_at
    FROM users
    WHERE user_id = ?
    `;

  db.query(sql, [req.user.user_id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to retrieve user",
        error: err,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User profile retrieved",
      user: results[0],
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

// Route to add hotspot
app.post("/api/hotspots", (req, res) => {
  const { username, lat, lng, description, status, address } = req.body;

  const sql = `
    INSERT INTO hotspots (username, lat, lng, description, status, address)
VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [username, lat, lng, description, status, address],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        id: result.insertId,
        lat,
        lng,
        description,
        status,
        address,
      });
    },
  );
});

//Route to show hotspots

app.get("/api/hotspots", (req, res) => {
  const sql = "SELECT * FROM hotspots";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
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
