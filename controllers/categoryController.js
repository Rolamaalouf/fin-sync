const supabase = require('../db').supabase;
const Category = require('../models/category');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category(name);
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name: category.name }]);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCategory };
