const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3003;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Health check route
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Order Service is running!',
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ error: 'Database connection error' });
  }
});

// Create an order with debugging
app.post('/orders', async (req, res) => {
  console.log('Received POST /orders with body:', req.body);

  const { user_id, product_id, quantity } = req.body || {};

  if (!user_id || !product_id || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [user_id, product_id, quantity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Error creating order' });
  }
});

// Get all orders
app.get('/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

app.listen(port, () => {
  console.log(`Order service listening on port ${port}`);
});

