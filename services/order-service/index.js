const express = require('express');
const app = express();
const PORT = process.env.PORT || 3003;

app.get('/health', (req, res) => {
  res.send('Order Service is running');
});

app.listen(PORT, () => {
  console.log(`Order Service listening on port ${PORT}`);
});

