const bcrypt = require('bcrypt');
const { supabase } = require('../db');
const Admin = require('../models/admin');

// Function to create a new admin (only accessible by super admins)
const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Get password from request body
    const currentAdmin = req.user;

    // Ensure that only super admins can create new admins
    if (currentAdmin.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Only super admins can create admins.' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin object with hashed password
    const newAdmin = new Admin(name, email, hashedPassword, 'admin');

    // Insert new admin into the database
    const { data, error } = await supabase
      .from('admins')
      .insert([{ name: newAdmin.name, email: newAdmin.email, password: newAdmin.password, role: newAdmin.role }]);

    if (error) {
      console.error('Error creating admin:', error); // Log the error for inspection
      throw error;
    }

    res.json(data); // Return the new admin data
  } catch (error) {
    console.error('Error creating admin:', error); // Log the error for inspection
    res.status(500).json({ error: error.message });
  }
};

// Function to sign up an admin (admin can create themselves, no super admin needed)
const signUpAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const { data: existingAdmin, error: existingError } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .limit(1);

    if (existingError) {
      console.error('Error checking existing admin:', existingError); // Log the error for inspection
      throw existingError;
    }

    if (existingAdmin && existingAdmin.length > 0) {
      return res.status(400).json({ error: 'Admin already exists with this email.' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin into the database
    const { data, error } = await supabase
      .from('admins')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          role: 'admin', // Default role for signup
        },
      ]);

    if (error) {
      console.error('Error signing up admin:', error); // Log the error for inspection
      throw error;
    }

    res.status(201).json({ message: 'Admin created successfully.', data });
  } catch (error) {
    console.error('Error signing up admin:', error); // Log the error for inspection
    res.status(500).json({ error: error.message });
  }
};

// Function to update an existing admin (only accessible by super admins)
const updateAdmin = async (req, res) => {
  try {
    const adminId = req.params.id; // Admin ID from URL
    const { name, email, password, role } = req.body; // New data for admin
    const currentAdmin = req.user; // The current logged-in admin (from the auth middleware)

    // Ensure that only super admins can update admins
    if (currentAdmin.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Only super admins can update admins.' });
    }

    // Fetch admin from the database to check if the admin exists
    const { data: admin, error: fetchError } = await supabase
      .from('admins')
      .select('*')
      .eq('id', adminId)
      .limit(1);

    if (fetchError) {
      console.error('Error fetching admin:', fetchError); // Log the error for inspection
      throw fetchError;
    }

    if (!admin || admin.length === 0) {
      return res.status(404).json({ error: 'Admin not found.' });
    }

    // If password is provided, hash it before saving
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10); // Hash the password if it's provided
    }

    // Update the admin's data
    const updatedData = { name, email, password: hashedPassword || admin[0].password, role };

    const { data, error } = await supabase
      .from('admins')
      .update(updatedData)
      .eq('id', adminId);

    if (error) {
      console.error('Error updating admin:', error); // Log the error for inspection
      throw error;
    }

    res.json(data); // Return updated admin data
  } catch (error) {
    console.error('Error updating admin:', error); // Log the error for inspection
    res.status(500).json({ error: error.message });
  }
};

// Function to delete an admin (only accessible by super admins)
const deleteAdmin = async (req, res) => {
  try {
    const adminId = req.params.id; // Admin ID from URL
    const currentAdmin = req.user; // The current logged-in admin (from the auth middleware)

    // Ensure that only super admins can delete admins
    if (currentAdmin.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Only super admins can delete admins.' });
    }

    // Delete the admin from the database
    const { data, error } = await supabase
      .from('admins')
      .delete()
      .eq('id', adminId);

    if (error) {
      console.error('Error deleting admin:', error); // Log the error for inspection
      throw error;
    }

    res.json(data); // Return deleted admin data
  } catch (error) {
    console.error('Error deleting admin:', error); // Log the error for inspection
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createAdmin, signUpAdmin, updateAdmin, deleteAdmin };
