const { supabase } = require('../db')

const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const { data: user, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: 'Invalid token' });

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (!userData) return res.status(403).json({ error: 'Access denied.' });

    req.user = { id: user.id, role: userData.role };
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const requireSuperAdmin = async (req, res, next) => {
  if (req.user.role !== 'superAdmin') {
    return res.status(403).json({ error: 'Only super admins can perform this action.' });
  }
  next();
};

module.exports = { requireAuth, requireSuperAdmin };
