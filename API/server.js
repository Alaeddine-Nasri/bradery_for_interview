// server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3000;
// app.use(cors());
app.use(cors({ origin: true }));

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "user",
  database: "testTechniqueDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Endpoint to get all product

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.get("/api/product", (req, res) => {
  const query = "SELECT * FROM prod";

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
