const supabase = require('../db').supabase;
const RecurringIncome = require('../models/recurringIncome');

const createRecurringIncome = async (req, res) => {
  try {
    const { title, description, amount, currency, startDate, endDate, categoryId } = req.body;
    const income = new RecurringIncome(title, description, amount, currency, startDate, endDate, categoryId);
    const { data, error } = await supabase
      .from('recurringIncome')
      .insert([{ title: income.title, description: income.description, amount: income.amount, currency: income.currency, startDate: income.startDate, endDate: income.endDate, categoryId: income.categoryId }]);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createRecurringIncome };
