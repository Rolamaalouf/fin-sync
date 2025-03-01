const supabase = require('../db');
const RecurringExpense = require('../models/recurringExpense');

const createRecurringExpense = async (req, res) => {
  try {
    const { title, description, amount, currency, startDate, endDate, categoryId, adminId, userId } = req.body;
    const expense = new RecurringExpense(title, description, amount, currency, startDate, endDate, categoryId, userId, adminId);
    const { data, error } = await supabase
      .from('recurringExpense')
      .insert([{ title: expense.title, description: expense.description, amount: expense.amount, currency: expense.currency, startDate: expense.startDate, endDate: expense.endDate, categoryId: expense.categoryId, userId: expense.use }]);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createRecurringExpense };
