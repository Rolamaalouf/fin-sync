// server.js
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const supabase = require('./db');  // Import the supabase client

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic route to check server
app.get('/', (req, res) => {
  res.send('Company Financial Tracker API');
});

// Example route to fetch data from Supabase
app.get('/get-users', async (req, res) => {
  const { data, error } = await supabase
    .from('users') // Replace 'users' with your table name
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
