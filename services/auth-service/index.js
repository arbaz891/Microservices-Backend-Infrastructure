// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/health', (req, res) => {
  res.send('Auth Service is running');
});

app.listen(PORT, () => {
  console.log(`Auth Service listening on port ${PORT}`);
});

