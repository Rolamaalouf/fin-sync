const RecurringIncome = require('../models/recurringIncome');

const createRecurringIncome = async (req, res) => {
  try {
    console.log('Received Request Body:', req.body); // Debugging log

    // Extract fields exactly as named in the request
    const { title, frequency, description, amount, currency, start, finish, category_id, user_id } = req.body;
    const categoryId = category_id || null; // Ensure it matches DB schema
    const userId = user_id || null; // Ensure correct format
 

    // Validate required fields
    if (!title || !amount || !currency || !start || !categoryId || !userId) {
      console.error('Missing fields:', { title, amount, currency, start, categoryId, userId });
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    // Map user_id (from request) to userId (internal)
    const recurringIncome = new RecurringIncome(title, frequency, description, amount, currency, start, finish, categoryId, userId);

    // Save to Supabase
    const data = await recurringIncome.save();

    res.status(201).json({ message: 'Recurring income created successfully', data });

  } catch (error) {
    console.error('Error creating recurring income:', error);
    res.status(500).json({ error: error.message });
  }
};

const getRecurringIncome = async (req, res) => {
  try {
    const data = await RecurringIncome.getAllRecurringIncome();
    res.json(data);
  } catch (error) {
    console.error('Error fetching recurring income:', error);
    res.status(500).json({ error: error.message });
  }
};

const getRecurringIncomeById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await RecurringIncome.getRecurringIncomeById(id);
    if (!data) return res.status(404).json({ error: 'Recurring income not found' });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching recurring expense by ID:', error);
    res.status(500).json({ error: error.message });
  }
};
const updateRecurringIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, frequency, description, amount, currency, start, finish, category_id, user_id } = req.body;

    const updatedIncome = await RecurringIncome.update(id, { title, frequency, description, amount, currency, start, finish, category_id, user_id });

    if (!updatedIncome) return res.status(404).json({ error: 'Recurring income not found' });

    res.status(200).json({ message: 'Recurring income updated successfully', data: updatedIncome });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete RecurringIncome
const deleteRecurringIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedIncome = await RecurringIncome.delete(id);

    if (!deletedIncome) return res.status(404).json({ error: 'Recurring income not found' });

    res.status(200).json({ message: 'Recurring income deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createRecurringIncome, getRecurringIncome, getRecurringIncomeById, updateRecurringIncome, deleteRecurringIncome };
