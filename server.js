// server.js
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const supabase = require('./db');  // Import the supabase client
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const fixedIncomeRoutes = require('./routes/fixedIncomeRoutes');
const fixedExpenseRoutes = require('./routes/fixedExpenseRoutes');
const recurringExpenseRoutes = require('./routes/recurringExpenseRoutes');
const profitGoalRoutes = require('./routes/profitGoalRoutes');
const reportRoutes = require('./routes/reportRoutes');
const { requireAuth, requireSuperAdmin } = require('./utils/auth');

app.use(express.json());
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', fixedIncomeRoutes);
app.use('/api', fixedExpenseRoutes);
app.use('/api', recurringIncomeRoutes);
app.use('/api', recurringExpenseRoutes);
app.use('/api', profitGoalRoutes);
app.use('/api', reportRoutes);


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
