const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 3000;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "user",
  database: "testTechniqueDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.get("/api/product", (req, res) => {
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

app.get("/api/user/:id", (req, res) => {
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

// Endpoint to add a product to the shopping cart for a user
app.post("/api/user/addToCart/:userId/:productId", async (req, res) => {
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

// Endpoint to remove a product from the shopping cart for a user
app.delete("/api/user/removeFromCart/:userId/:productId", async (req, res) => {
  const { userId, productId } = req.params;

  try {
    // Check if the user exists
    const userQuery = `SELECT * FROM users WHERE id = ${userId}`;
    const [userResults] = await pool.promise().query(userQuery);

    if (userResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product exists in the user's shopping cart
    const cartProductQuery = `
      SELECT * FROM user_products
      WHERE userId = ${userId} AND productId = ${productId} AND type = 'cart'
    `;
    const [cartProductResults] = await pool.promise().query(cartProductQuery);

    if (cartProductResults.length === 0) {
      return res.status(404).json({ error: "Product not found in the cart" });
    }

    // Remove the product from the user's shopping cart
    const removeFromCartQuery = `
      DELETE FROM user_products
      WHERE userId = ${userId} AND productId = ${productId} AND type = 'cart'
    `;
    await pool.promise().query(removeFromCartQuery);

    return res.json({ success: true });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to buy a product for a user
app.post("/api/user/buyProduct/:userId/:productId", async (req, res) => {
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

    // Add the product to the user's boughtItems
    const buyProductQuery = `
      INSERT INTO user_products (userId, productId, type)
      VALUES (${userId}, ${productId}, 'boughtItems')
    `;
    await pool.promise().query(buyProductQuery);

    // Optionally, you can remove the product from the user's shopping cart
    const removeFromCartQuery = `
      DELETE FROM user_products
      WHERE userId = ${userId} AND productId = ${productId} AND type = 'cart'
    `;
    await pool.promise().query(removeFromCartQuery);

    return res.json({ success: true });
  } catch (error) {
    console.error("Error buying product:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// endpoint to get brought items
app.get("/api/user/boughtProducts/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Check if the user exists
    const userQuery = `SELECT * FROM users WHERE id = ${userId}`;
    const [userResults] = await pool.promise().query(userQuery);

    if (userResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch the list of bought products for the user
    const boughtProductsQuery = `
      SELECT p.*
      FROM user_products up
      JOIN products p ON up.productId = p.id
      WHERE up.userId = ${userId} AND up.type = 'boughtItems'
    `;
    const [boughtProductsResults] = await pool
      .promise()
      .query(boughtProductsQuery);

    return res.json(boughtProductsResults);
  } catch (error) {
    console.error("Error fetching bought products:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get cart items
app.get("/api/user/cartProducts/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Check if the user exists
    const userQuery = `SELECT * FROM users WHERE id = ${userId}`;
    const [userResults] = await pool.promise().query(userQuery);

    if (userResults.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch the list of cart products for the user
    const cartProductsQuery = `
      SELECT p.*
      FROM user_products up
      JOIN products p ON up.productId = p.id
      WHERE up.userId = ${userId} AND up.type = 'cart'
    `;
    const [cartProductsResults] = await pool.promise().query(cartProductsQuery);

    return res.json(cartProductsResults);
  } catch (error) {
    console.error("Error fetching cart products:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
