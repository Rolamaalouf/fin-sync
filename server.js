const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const supabase = require('./db');  // Import the supabase client
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const fixedIncomeRoutes = require('./routes/fixedIncomeRoutes');
const fixedExpenseRoutes = require('./routes/fixedExpenseRoutes');
const recurringExpenseRoutes = require('./routes/recurringExpenseRoutes');
const recurringIncomeRoutes = require('./routes/recurringIncomeRoutes');
const profitGoalRoutes = require('./routes/profitGoalRoutes');
const reportRoutes = require('./routes/reportRoutes');
const { requireAuth, requireSuperAdmin } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic route to check server
app.get('/', (req, res) => {
  res.send('Company Financial Tracker API');
});

// Example route to fetch users from Supabase
app.get('/get-users', async (req, res) => {
  const { data, error } = await supabase
    .from('users') // Ensure this matches your Supabase table name
    .select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// 🔐 Login Route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Fetch user from Supabase
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Compare hashed password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT Token
  const token = jwt.sign(
    { id: user.id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// Use routes with middleware
app.use('/api/admins', requireAuth, requireSuperAdmin, adminRoutes);
app.use('/api/categories', requireAuth, categoryRoutes);
app.use('/api/fixed-incomes', requireAuth, fixedIncomeRoutes);
app.use('/api/fixed-expenses', requireAuth, fixedExpenseRoutes);
app.use('/api/recurring-incomes', requireAuth, recurringIncomeRoutes);
app.use('/api/recurring-expenses', requireAuth, recurringExpenseRoutes);
app.use('/api/profit-goals', requireAuth, profitGoalRoutes);
app.use('/api/reports', requireAuth, reportRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});