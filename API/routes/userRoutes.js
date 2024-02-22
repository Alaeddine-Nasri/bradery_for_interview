// server/routes/user.js
const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM users WHERE id = ${userId}`;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing user query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.length === 0) {
        // No user found with the given ID
        res.status(404).json({ error: "User not found" });
      } else {
        const user = results[0];
        res.json(user);
      }
    }
  });
});

router.post("/addToCart/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Check if the user exists
    const userQuery = `SELECT * FROM users WHERE id = ${userId}`;
    const [userResults] = await pool.promise().query(userQuery);

    if (userResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product exists
    const productQuery = `SELECT * FROM products WHERE id = ${productId}`;
    const [productResults] = await pool.promise().query(productQuery);

    if (productResults.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Add the product to the user's shopping cart
    const addToCartQuery = `
      INSERT INTO user_products (userId, productId, type)
      VALUES (${userId}, ${productId}, 'cart')
    `;
    await pool.promise().query(addToCartQuery);

    return res.json({ success: true });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add other user-related routes as needed

module.exports = router;
