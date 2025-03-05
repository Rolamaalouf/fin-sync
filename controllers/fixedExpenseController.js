const supabase = require('../db').supabase;
const FixedExpense = require('../models/fixedExpense');

const createFixedExpense = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debugging log
   // Extracting and ensuring correct naming
   const { title, description, amount, currency, date, category_id, user_id } = req.body;
   const categoryId = category_id || null; // Ensure it matches DB schema
   const userId = user_id || null; // Ensure correct format



    // Validate required fields
    if (!title || !amount || !currency || !date || !categoryId || !userId) {
      console.error('Missing required fields:', { title, amount, currency, date, categoryId, userId });
      return res.status(400).json({ error: 'All fields including categoryId and userId are required.' });
    }

    const expense = new FixedExpense(title, description, amount, currency, date, categoryId, userId);
    const { data, error } = await supabase
      .from('fixed_expenses')
      .insert([
        {
          title: expense.title,
          description: expense.description,
          amount: expense.amount,
          currency: expense.currency,
          date: expense.date,
          category_id: expense.categoryId, // Ensure correct field name
          user_id: expense.userId, // Ensure correct field name
        }
      ]);

    if (error) {
      console.error('Error creating fixed expense:', error); // Log error for debugging
      throw error;
    }

    res.status(201).json({ message: 'Fixed expense created successfully', data });
  } catch (error) {
    console.error('Error creating fixed expense:', error); // Log the full error
    res.status(500).json({ error: error.message });
  }
};

const getFixedExpense = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('fixed_expenses')
      .select('*');

    if (error) {
      console.error('Error fetching fixed expenses:', error); // Log error
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error('Error fetching fixed expenses:', err); // Log error
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createFixedExpense, getFixedExpense };