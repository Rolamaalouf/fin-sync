const supabase = require('../db').supabase;

const FixedIncome = require('../models/fixedIncome');

const createFixedIncome = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debugging log

    // Extracting and ensuring correct naming
    const { title, description, amount, currency, date, category_id, user_id } = req.body;
    const categoryId = category_id || null; // Ensure it matches DB schema
    const userId = user_id || null; // Ensure correct format

    // Validate required fields
    if (!title || !amount || !currency || !date || !categoryId || !userId) {
      console.error('Missing required fields:', { title, amount, currency, date, categoryId, userId });
      return res.status(400).json({ error: 'All fields including categoryId and userId are required.' });
    }

    console.log('Validated Inputs:', { title, amount, currency, date, categoryId, userId });

    // Create new FixedIncome instance
    const income = new FixedIncome(title, description, amount, currency, date, categoryId, userId);

    // Save to database
    const data = await income.save();

    res.status(201).json({ message: 'Fixed income created successfully', data });
  } catch (error) {
    console.error('Error creating fixed income:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createFixedIncome };

const getFixedIncome = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('fixed_income')
      .select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateFixedIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, amount, currency, date, category_id, user_id } = req.body;

    const { data, error } = await supabase
      .from('fixed_income')
      .update({ title, description, amount, currency, date, category_id, user_id })
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Fixed income updated successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete FixedIncome
const deleteFixedIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('fixed_income')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ message: 'Fixed income deleted successfully', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createFixedIncome, getFixedIncome, updateFixedIncome, deleteFixedIncome };
