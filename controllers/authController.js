const { supabase } = require('../db');

const createSuperAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign up the Super Admin (no email confirmation required)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: null // Skip email redirect for confirmation
      }
    });

    if (error) return res.status(400).json({ error: error.message });

    // Insert Super Admin into 'users' table
    const { error: insertError } = await supabase.from('users').insert([
      {
        id: data.user.id,
        name: 'Super Admin',
        email: email,
        role: 'superAdmin'
      }
    ]);

    if (insertError) return res.status(400).json({ error: insertError.message });

    // Sign in the user to get the access token
    const { session, error: signInError } = await supabase.auth.signIn({
      email,
      password
    });

    if (signInError) return res.status(400).json({ error: signInError.message });

    return res.status(201).json({
      message: 'Super Admin created successfully',
      user: data.user,
      access_token: session.access_token, // Return the access token
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


module.exports = { createSuperAdmin };
