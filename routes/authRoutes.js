router.post('/signup', async (req, res) => {
    const { email, password, role } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
  
    // Prevent users from signing up as a super admin
    if (role === 'superAdmin') {
      return res.status(403).json({ error: 'You cannot sign up as a super admin.' });
    }
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });
  
    if (error) return res.status(500).json({ error: error.message });
  
    // Store role in the 'users' table (default to 'admin' or other roles)
    await supabase.from('users').insert([{ id: data.user.id, email, role: role || 'admin' }]);
  
    res.json({ user: data.user });
  });
  