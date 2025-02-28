const { supabase } = require('../db');

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const { data: user, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: 'Invalid or expired token' });

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const requireSuperAdmin = async (req, res, next) => {
  try {
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', req.user.id)
      .single();

    if (!userData || userData.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Only super admins can access this route.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { requireAuth, requireSuperAdmin };
