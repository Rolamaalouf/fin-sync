const supabase = require('../db');
const RecurringIncome = require('../models/recurringIncome');

const createRecurringIncome = async (req, res) => {
  try {
    const { title, description, amount, currency, startDate, endDate, categoryId, adminId, userId } = req.body;
    const income = new RecurringIncome(title, description, amount, currency, startDate, endDate, categoryId, userId, adminId);
    const { data, error } = await supabase
      .from('recurringIncome')
      .insert([{ title: income.title, description: income.description, amount: income.amount, currency: income.currency, startDate: income.startDate, endDate: income.endDate, categoryId: income.categoryId, adminId: income.adminId, userId :income.userId }]);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createRecurringIncome };
