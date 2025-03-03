const { supabase } = require('../db');

const Category = require('../models/category'); // Ensure the correct path

const createCategory = async (req, res) => {
  try {
    const { name, user_id } = req.body;

    console.log('Request Body:', req.body);
    console.log('User ID:', user_id);

    if (!name || !user_id) {
      return res.status(400).json({ error: 'Name and user ID are required.' });
    }

    // Use the Category model
    const category = new Category(name, user_id);
    const data = await category.save();

    res.status(201).json({ message: 'Category created successfully.', data });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category.' });
  }
};

const getCategory = async (req, res) => {
  try {
    const data = await Category.getAllCategories();
    res.json(data);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to fetch categories.' });
  }
};

module.exports = { createCategory, getCategory };

