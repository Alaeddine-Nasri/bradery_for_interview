// server/routes/favorite.js
const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Check if the user exists
    const userQuery = `SELECT * FROM users WHERE id = ${userId}`;
    const [userResults] = await pool.promise().query(userQuery);

    if (userResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch the list of favorite items for the user
    const favoriteItemsQuery = `
      SELECT p.*
      FROM user_products up
      JOIN products p ON up.productId = p.id
      WHERE up.userId = ${userId} AND up.type = 'favoriteItems'
    `;
    const [favoriteItemsResults] = await pool
      .promise()
      .query(favoriteItemsQuery);

    return res.json(favoriteItemsResults);
  } catch (error) {
    console.error("Error fetching favorite items:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/check/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Check if the user exists
    const userQuery = `SELECT * FROM users WHERE id = ${userId}`;
    const [userResults] = await pool.promise().query(userQuery);

    if (userResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product is a favorite for the user
    const checkFavoriteQuery = `
      SELECT *
      FROM user_products
      WHERE userId = ${userId} AND productId = ${productId} AND type = 'favoriteItems'
    `;
    const [checkFavoriteResults] = await pool
      .promise()
      .query(checkFavoriteQuery);

    return res.json({ isFavorite: checkFavoriteResults.length > 0 });
  } catch (error) {
    console.error("Error checking if product is a favorite:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add/:userId/:productId", async (req, res) => {
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

    // Add the product to the user's favorite items
    const addToFavoriteQuery = `
      INSERT INTO user_products (userId, productId, type)
      VALUES (${userId}, ${productId}, 'favoriteItems')
    `;
    await pool.promise().query(addToFavoriteQuery);

    return res.json({ success: true });
  } catch (error) {
    console.error("Error adding product to favorite:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/remove/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Check if the user exists
    const userQuery = `SELECT * FROM users WHERE id = ${userId}`;
    const [userResults] = await pool.promise().query(userQuery);

    if (userResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product exists in the user's favorite items
    const favoriteProductQuery = `
      SELECT * FROM user_products
      WHERE userId = ${userId} AND productId = ${productId} AND type = 'favoriteItems'
    `;
    const [favoriteProductResults] = await pool
      .promise()
      .query(favoriteProductQuery);

    if (favoriteProductResults.length === 0) {
      return res
        .status(404)
        .json({ error: "Product not found in the favorites" });
    }

    // Remove the product from the user's favorite items
    const removeFromFavoriteQuery = `
      DELETE FROM user_products
      WHERE userId = ${userId} AND productId = ${productId} AND type = 'favoriteItems'
    `;
    await pool.promise().query(removeFromFavoriteQuery);

    return res.json({ success: true });
  } catch (error) {
    console.error("Error removing product from favorite:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
