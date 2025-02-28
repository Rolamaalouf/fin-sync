const { supabase } = require('../db');

const createCategory = async (req, res) => {
  try {
    const { name, adminId } = req.body;

  console.log('Request Body:', req.body); // Log the request body
  console.log('Admin ID:', adminId); // Log the adminId specifically

  
  if (!adminId) {
    return res.status(400).json({ error: 'Admin ID is required.' });
  }

  // Insert new category into the database
    const { data, error } = await supabase
      .from('categories')
      .insert([
        {
          name,
          admin_id: adminId,
        },
      ]);

    if (error) {
      console.error('Error creating category:', error); // Log the error for inspection
      throw error;
    }

    res.status(201).json({ message: 'Category created successfully.', data });
  } catch (error) {
    console.error('Error creating category:', error); // Log the error for inspection
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCategory };

