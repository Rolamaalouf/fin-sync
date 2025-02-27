const supabase = require('../db').supabase;
const ProfitGoal = require('../models/profitGoal');

const createProfitGoal = async (req, res) => {
  try {
    const { amount, targetDate } = req.body;
    const goal = new ProfitGoal(amount, targetDate);
    const { data, error } = await supabase
      .from('profit_goals')
      .insert([{ amount: goal.amount, targetDate: goal.targetDate }]);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProfitGoal };
