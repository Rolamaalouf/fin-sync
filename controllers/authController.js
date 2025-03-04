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
const signOutuser = async (req, res) => {
  try {
    // Call the signOut method from Supabase Auth
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      return res.status(400).json({ error: signOutError.message });
    }

    return res.status(200).json({ message: 'Sign out successful' });
  } catch (err) {
    console.error('Unexpected error during sign out:', err);
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

    // Make sure user exists before calling user properties
    if (!data.user) {
      return res.status(500).json({ error: "User data is missing." });
    }

    const userId = data.user.id; // Get user ID

    // Fetch user role from the 'users' table
    const { data: userData, error: roleError } = await supabase
      .from('users')
      .select('role, email, id') // make sure you select fields
      .eq('id', userId)
      .single();

    if (roleError) {
      console.error('Error fetching user role:', roleError);  // Log the actual error
      return res.status(500).json({ error: 'Error fetching user role.' });
    }

    if (!userData) {
      return res.status(404).json({ error: "User role not found in database." });
    }

    // Attach the correct role to the session
    data.user.role = userData.role;

    // Log the user data and session to help with debugging
    console.log("Data User: ", data.user);
    console.log("userData: ", userData);
    console.log("email", email);

    // Add role to the response object
    return res.status(200).json({
      message: 'Sign in successful',
      user: data.user,
      access_token: data.session.access_token,  // Corrected token access
      role: userData.role,  // Include the role in the response
    });
  } catch (err) {
    console.error('Unexpected error:', err); // Log unexpected errors for debugging
    return res.status(500).json({ error: err.message });
  }
};
const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user is a Super Admin
    if (req.user.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Only super admins can create admins.' });
    }

    // Check if the email is already registered
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Sign up the admin user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: null },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert Admin into the 'users' table
    const { error: insertError } = await supabase.from('users').insert([
      {
        id: data.user.id,
        name: 'Admin User',
        email,
        role: 'admin',
      },
    ]);

    if (insertError) {
      return res.status(400).json({ error: insertError.message });
    }

    return res.status(201).json({
      message: 'Admin created successfully',
      user: data.user,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Admin Signup (without Super Admin approval)
const signupAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Sign up the admin user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: null },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Insert Admin into the 'users' table
    const { error: insertError } = await supabase.from('users').insert([
      {
        id: data.user.id,
        name: 'Admin User',
        email,
        role: 'admin',
      },
    ]);

    if (insertError) {
      return res.status(400).json({ error: insertError.message });
    }

    return res.status(201).json({
      message: 'Admin registered successfully',
      user: data.user,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
// Get All Admins (Only for Super Admins)
const getAllAdmins = async (req, res) => {
  try {
    // Ensure only super admins can access this route
    if (req.user.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Access denied: Only super admins can view admins.' });
    }

    // Fetch all users with role 'admin'
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, role')
      .eq('role', 'admin');

    if (error) {
      return res.status(500).json({ error: 'Error fetching admin users' });
    }

    return res.status(200).json({ admins: data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete Admin (Only for Super Admins)
const deleteAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure only super admins can access this route
    if (req.user.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Access denied: Only super admins can delete admins.' });
    }

    // Delete the admin from Supabase auth
    const { error: authError } = await supabase.auth.admin.deleteUser (userId);
    if (authError) {
      return res.status(500).json({ error: 'Error deleting admin from authentication' });
    }

    // Delete the admin from the 'users' table
    const { error } = await supabase.from('users').delete().eq('id', userId);
    if (error) {
      return res.status(500).json({ error: 'Error deleting admin from database' });
    }

    return res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createSuperAdmin, signInUser, createAdmin, signupAdmin , signOutuser, getAllAdmins, deleteAdmin};


