const { supabase } = require('../db');

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' });

    // Get user from token
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) return res.status(401).json({ error: 'Invalid token' });

    const userId = data.user.id;

    // Fetch user role from 'users' table
    const { data: userData, error: roleError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (roleError || !userData) return res.status(403).json({ error: 'Access denied: User role not found' });

    // Attach user info to request
    req.user = { id: userId, role: userData.role };
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const requireSuperAdmin = (req, res, next) => {
  if (req.user.role !== 'superAdmin') {
    return res.status(403).json({ error: 'Only super admins can perform this action.' });
  }
  next();
};

module.exports = { requireAuth, requireSuperAdmin };
