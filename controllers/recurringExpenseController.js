const RecurringExpense = require('../models/recurringExpense');

const createRecurringExpense = async (req, res) => {
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
    const recurringExpense = new RecurringExpense(title, frequency, description, amount, currency, start, finish, categoryId, userId);

    // Save to Supabase
    const data = await recurringExpense.save();

    res.status(201).json({ message: 'Recurring expense created successfully', data });

  } catch (error) {
    console.error('Error creating recurring expense:', error);
    res.status(500).json({ error: error.message });
  }
};

const getRecurringExpenses = async (req, res) => {
  try {
    const data = await RecurringExpense.getAllRecurringExpenses();
    res.json(data);
  } catch (error) {
    console.error('Error fetching recurring expenses:', error);
    res.status(500).json({ error: error.message });
  }
};

const getRecurringExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await RecurringExpense.getRecurringExpenseById(id);
    if (!data) return res.status(404).json({ error: 'Recurring expense not found' });
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching recurring expense by ID:', error);
    res.status(500).json({ error: error.message });
  }
};
const updateRecurringExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, frequency, description, amount, currency, start, finish, category_id, user_id } = req.body;

    const updatedExpense = await RecurringExpense.update(id, { title, frequency, description, amount, currency, start, finish, category_id, user_id });

    if (!updatedExpense) return res.status(404).json({ error: 'Recurring expense not found' });

    res.status(200).json({ message: 'Recurring expense updated successfully', data: updatedExpense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete RecurringExpense
const deleteRecurringExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await RecurringExpense.delete(id);

    if (!deletedExpense) return res.status(404).json({ error: 'Recurring expense not found' });

    res.status(200).json({ message: 'Recurring expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createRecurringExpense, getRecurringExpenses, getRecurringExpenseById, updateRecurringExpense, deleteRecurringExpense };
