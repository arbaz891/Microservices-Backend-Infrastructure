const express = require('express');
const { Client } = require('pg');

const app = express();
const PORT = process.env.PORT || 3004;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL (product-service)');

    app.listen(PORT, () => {
      console.log(`Product Service listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to PostgreSQL (product-service):', error);
    process.exit(1);
  }
})();

app.get('/health', (req, res) => {
  res.send('Product Service is running');
});

app.get('/products', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM products ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

