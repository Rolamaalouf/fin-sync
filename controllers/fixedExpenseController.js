const supabase = require('../db').supabase;
const FixedExpense = require('../models/fixedExpense');

const createFixedExpense = async (req, res) => {
  try {
    const { title, description, amount, currency, date, categoryId, adminId } = req.body;
    const expense = new FixedExpense(title, description, amount, currency, date, categoryId, adminId);
    const { data, error } = await supabase
      .from('fixed-expenses')
      .insert([
        {
          title: expense.title,
          description: expense.description,
          amount: expense.amount,
          currency: expense.currency,
          date: expense.date,
          category_id: expense.categoryId,
          admin_id: expense.adminId
        }
      ]);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createFixedExpense };
