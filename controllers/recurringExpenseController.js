const supabase = require('../db').supabase;
const RecurringExpense = require('../models/recurringExpense');

const createRecurringExpense = async (req, res) => {
  try {
    const { title, description, amount, currency, startDate, endDate, categoryId } = req.body;
    const expense = new RecurringExpense(title, description, amount, currency, startDate, endDate, categoryId);
    const { data, error } = await supabase
      .from('recurring_expenses')
      .insert([{ title: expense.title, description: expense.description, amount: expense.amount, currency: expense.currency, startDate: expense.startDate, endDate: expense.endDate, categoryId: expense.categoryId }]);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createRecurringExpense };
