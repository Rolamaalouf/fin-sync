const supabase = require('../db').supabase;
const FixedIncome = require('../models/fixedIncome');

const createFixedIncome = async (req, res) => {
  try {
    const { title, description, amount, currency, date, categoryId, adminId } = req.body;
    const income = new FixedIncome(title, description, amount, currency, date, categoryId, adminId);
    const { data, error } = await supabase
      .from('fixed-income')
      .insert([
        {
          title: income.title,
          description: income.description,
          amount: income.amount,
          currency: income.currency,
          date: income.date,
          category_id: income.categoryId,
          admin_id: income.adminId,
        }
      ]);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFixedIncome = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('fixed-income')
      .select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



module.exports = { createFixedIncome , getFixedIncome };
