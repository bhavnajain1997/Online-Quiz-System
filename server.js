const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.log("DB Error:", err);
    return;
  }
  console.log("MySQL Connected");
});

// TEST route
app.get('/', (req, res) => {
  res.send("Backend running");
});
//User details 
app.get('/users', (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});
//Login 
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "DB error" });
      }

      if (result.length > 0) {
        res.json({ message: "Login successful", user: result[0] });
      } else {
        res.status(400).json({ message: "Invalid credentials" });
      }
    }
  );
});
// GET questions
app.get('/questions', (req, res) => {
  db.query("SELECT * FROM questions", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// Submit quiz
app.post('/submit', (req, res) => {
  const answers = req.body.answers;

  db.query("SELECT * FROM questions", (err, questions) => {
    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correct_answer) {
        score++;
      }
    });

    res.json({ score });
  });
});

// server start
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});