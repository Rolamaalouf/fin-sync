const { supabase } = require('../db')

// Create Super Admin
const createSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign up the Super Admin
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: null },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert Super Admin into 'users' table
    const { error: insertError } = await supabase.from('users').insert([
      {
        id: data.user.id,
        name: 'Super Admin',
        email,
        role: 'superAdmin',
      },
    ]);

    if (insertError) {
      return res.status(400).json({ error: insertError.message });
    }

    return res.status(201).json({
      message: 'Super Admin created successfully',
      user: data.user,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Sign in with password
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return res.status(400).json({ error: signInError.message });
    }

    // Ensure session exists before accessing properties
    if (!data || !data.session) {
      return res.status(500).json({ error: "Session data is missing." });
    }

    return res.status(200).json({
      message: 'Sign in successful',
      user: data.user,
      access_token: data.session.access_token,  // Corrected token access
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createSuperAdmin, signInUser };
