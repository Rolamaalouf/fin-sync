const { supabase } = require('../db');

exports.createProfitGoal = async (req, res) => {
  const { goalAmount, description } = req.body;

  const { data, error } = await supabase.from('profit_goals').insert([
    { goalAmount, description, createdBy: req.user.id }
  ]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: 'Profit goal created successfully', data });
};

exports.getProfitGoals = async (req, res) => {
  const { data, error } = await supabase.from('profit_goals').select('*');

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json(data);
};