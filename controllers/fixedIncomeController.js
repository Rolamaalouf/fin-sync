const supabase = require('../db').supabase;
const FixedIncome = require('../models/fixedIncome');

const createFixedIncome = async (req, res) => {
  try {
    const { title, description, amount, currency, date, categoryId } = req.body;
    const income = new FixedIncome(title, description, amount, currency, date, categoryId);
    const { data, error } = await supabase
      .from('fixed_incomes')
      .insert([{ title: income.title, description: income.description, amount: income.amount, currency: income.currency, date: income.date, categoryId: income.categoryId }]);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createFixedIncome };
