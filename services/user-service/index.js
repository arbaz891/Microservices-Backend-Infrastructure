// index.js

require('dotenv').config(); // ✅ Load environment variables

const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3002;

// ✅ PostgreSQL connection setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Test DB connection on startup
pool.connect()
  .then((client) => {
    console.log('✅ Connected to PostgreSQL (user-service)');
    client.release();
  })
  .catch((err) => {
    console.error('❌ Failed to connect to PostgreSQL:', err.message);
    process.exit(1); // Exit process if DB connection fails
  });

// ✅ Health check route
app.get('/health', (req, res) => {
  res.status(200).send('✅ User Service is running');
});

// ✅ Route to fetch users from "users" table
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching users:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`👤 User Service listening on port ${PORT}`);
});

