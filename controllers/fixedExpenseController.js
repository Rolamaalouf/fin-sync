const supabase = require('../db').supabase;
const FixedExpense = require('../models/fixedExpense');

const createFixedExpense = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debugging log

    // Extracting and ensuring correct naming
    const { title, description, amount, currency, date, category_id, user_id } = req.body;
    const categoryId = category_id || null; // Ensure it matches DB schema
    const userId = user_id || null; // Ensure correct format

    const expense = new FixedExpense(title, description, amount, currency, date, categoryId, userId);
    const { data, error } = await supabase
      .from('fixed_expenses')
      .insert([
        {
          title: expense.title,
          description: expense.description,
          amount: expense.amount,
          currency: expense.currency,
          date: expense.date,
          category_id: expense.categoryId, // Ensure correct field name
          user_id: expense.userId, // Ensure correct field name
        }
      ]);

    if (error) {
      console.error('Error creating fixed expense:', error); // Log error for debugging
      throw error;
    }

    res.status(201).json({ message: 'Fixed expense created successfully', data });
  } catch (error) {
    console.error('Error creating fixed expense:', error); // Log the full error
    res.status(500).json({ error: error.message });
  }
};

const getFixedExpense = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('fixed_expenses')
      .select('*');

    if (error) {
      console.error('Error fetching fixed expenses:', error); // Log error
      return res.status(500).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error('Error fetching fixed expenses:', err); // Log error
    return res.status(500).json({ error: err.message });
  }
};

const deleteFixedExpense = async (req, res) => {
  try {
    const { id } = req.params;  // The ID of the fixed expense to be deleted

    // Ensure the ID is valid
    if (!id) {
      return res.status(400).json({ error: 'Expense ID is required' });
    }

    // Delete from the database
    const { data, error } = await supabase
      .from('fixed_expenses')
      .delete()
      .eq('id', id); // Match the record with the given ID

    if (error) {
      console.error('Error deleting fixed expense:', error);
      return res.status(500).json({ error: error.message });
    }

    // Check if any data was deleted
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Fixed expense not found' });
    }

    res.status(200).json({ message: 'Fixed expense deleted successfully', data });
  } catch (error) {
    console.error('Error deleting fixed expense:', error);
    res.status(500).json({ error: error.message });
  }
};

const updateFixedExpense = async (req, res) => {
  try {
    const { id } = req.params;  // The ID of the fixed expense to be updated
    const { title, description, amount, currency, date, category_id, user_id } = req.body;
    const categoryId = category_id || null; // Ensure it matches DB schema
    const userId = user_id || null; // Ensure correct format

    const data = {
      title,
      description,
      amount,
      currency,
      date,
      category_id: categoryId,
      user_id: userId,
    };

    // Filter out null values
    Object.keys(data).forEach(key => data[key] === null && delete data[key]);

    const updatedExpense = await FixedExpense.updateFixedExpense(id, data);

    if (!updatedExpense) {
      return res.status(404).json({ error: 'Fixed expense not found' });
    }

    res.status(200).json({ message: 'Fixed expense updated successfully', data: updatedExpense });
  } catch (error) {
    console.error('Error updating fixed expense:', error); // Log the full error
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createFixedExpense, getFixedExpense, deleteFixedExpense, updateFixedExpense };
