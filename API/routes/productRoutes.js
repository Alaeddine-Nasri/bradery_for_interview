// server/routes/products.js
const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/", (req, res) => {
  const query = "SELECT * FROM products";

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing product query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Product results:", results);
      res.json(results);
    }
  });
});

router.get("/promotion", (req, res) => {
  const query = "SELECT * FROM products WHERE promotion = true";

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing promotional product query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Promotional Product results:", results);
      res.json(results);
    }
  });
});

router.get("/:type", (req, res) => {
  const { type } = req.params;

  // Validate the filter type (optional)
  const validFilters = ["Best Match", "New Arrival", "Trendy", "Promotion"];
  if (!validFilters.includes(type)) {
    return res.status(400).json({ error: "Invalid filter type" });
  }

  // Map the type to the corresponding database column
  const columnMap = {
    "Best Match": "bestMatch",
    "New Arrival": "newArrival",
    Trendy: "trendy",
    Promotion: "promotion",
  };

  const columnName = columnMap[type];

  // Use a prepared statement to prevent SQL injection
  const query = `SELECT * FROM products WHERE ${columnName} = true`;
  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing product query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    console.log("Filtered products results:", results);
    res.json(results);
  });
});

module.exports = router;
