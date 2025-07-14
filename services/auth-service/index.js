const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');

const app = express();
const port = 3001;

app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Redis connection
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', err => console.error('Redis Error:', err));

(async () => {
  try {
    await redisClient.connect();
    console.log('✅ Connected to Redis');
  } catch (err) {
    console.error('Redis connection failed:', err);
  }
})();

// Root route
app.get('/', (req, res) => {
  res.send('Auth Service is running!');
});

// Enhanced health check
app.get('/health', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT NOW()');
    const redisRes = await redisClient.ping();
    res.status(200).json({
      status: 'OK',
      postgresTime: dbRes.rows[0].now,
      redisStatus: redisRes,
    });
  } catch (err) {
    console.error('Health check failed:', err);
    res.status(500).json({ error: 'DB or Redis connection failed', message: err.message });
  }
});

// Example login route (modify as needed)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Dummy authentication logic (replace with real one)
  if (username === 'admin' && password === 'password') {
    res.json({ message: 'Login successful', token: 'dummy-jwt-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Auth Service listening at http://localhost:${port}`);
});

