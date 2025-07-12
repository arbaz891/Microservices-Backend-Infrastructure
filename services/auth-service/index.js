const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Auth Service is running!');
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('OK');
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
  console.log(`Auth Service listening at http://localhost:${port}`);
});

