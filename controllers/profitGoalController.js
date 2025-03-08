const { supabase } = require('../db');
const ProfitGoal = require('../models/profitGoal');

exports.createProfitGoal = async (req, res) => {
  console.log("Request Body:", req.body);  // ✅ Debugging request body
  console.log("User Info:", req.user);  // ✅ Debugging user info

  try {
    const { targetProfit, startDate, endDate, userId } = req.body;

    if (!targetProfit || !startDate || !endDate || !userId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Ensure req.user is defined
    if (!req.user || req.user.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Unauthorized: Only Super Admins can create profit goals.' });
    }

    const profitGoal = new ProfitGoal(targetProfit, startDate, endDate, userId);
    const data = await profitGoal.save();

    res.status(201).json({ message: 'Profit goal created successfully', data });
  } catch (err) {
    console.error('Error creating profit goal:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getProfitGoals = async (req, res) => {
  try {
    const { data, error } = await supabase.from('profit_goals').select('*');

    if (error) {
      console.error('Error fetching profit goals:', error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: err.message });
  }
  
};
exports.patchProfitGoal = async (req, res) => {
  try {
    console.log("User in update request:", req.user); // Debug log
    
    if (!req.user || req.user.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Unauthorized: Only Super Admins can update profit goals.' });
    }

    const { id } = req.params;
    const { targetProfit, startDate, endDate } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Profit goal ID is required.' });
    }

    if (!targetProfit && !startDate && !endDate) {
      return res.status(400).json({ error: 'At least one field is required to update.' });
    }

    const updateFields = {};
    if (targetProfit !== undefined) updateFields.target_profit = targetProfit;
    if (startDate !== undefined) updateFields.start_date = startDate;
    if (endDate !== undefined) updateFields.end_date = endDate;

    const { data, error } = await supabase
      .from('profit_goals')
      .update(updateFields)
      .eq('id', id)
      .select('*');

    if (error) {
      console.error('Error updating profit goal:', error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Profit goal updated successfully', data });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProfitGoal = async (req, res) => {
  try {
    console.log("User in delete request:", req.user); // Debug log
    
    if (!req.user || req.user.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Unauthorized: Only Super Admins can delete profit goals.' });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Profit goal ID is required.' });
    }

    const { data, error } = await supabase
      .from('profit_goals')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting profit goal:', error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Profit goal deleted successfully', data });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: err.message });
  }
};


