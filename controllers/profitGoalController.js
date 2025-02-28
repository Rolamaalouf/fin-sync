const { supabase } = require('../db');
const { requireAuth, requireSuperAdmin } = require('../utils/auth');

const createProfitGoal = async (req, res) => {
  try {
    const { targetProfit, startDate, endDate } = req.body;

    // Insert new profit goal into the database
    const { data, error } = await supabase
      .from('profit_goals')
      .insert([
        {
          target_profit: targetProfit,
          start_date: startDate,
          end_date: endDate,
          created_by: req.user.id, // Store the ID of the super admin who created the goal
        },
      ]);

    if (error) {
      console.error('Error creating profit goal:', error); // Log the error for inspection
      throw error;
    }

    res.status(201).json({ message: 'Profit goal created successfully.', data });
  } catch (error) {
    console.error('Error creating profit goal:', error); // Log the error for inspection
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProfitGoal };
