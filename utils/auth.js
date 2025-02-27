const supabase = require('../db').supabase;

const requireAuth = async (req, res, next) => {
  try {
    const user = req.user; // Assuming you have a way to get the current user
    if (!user) {
      return res.status(401).json({ error: 'You must be logged in.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const requireSuperAdmin = async (req, res, next) => {
  try {
    const user = req.user; // Assuming you have a way to get the current user
    if (user.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Only super admins can access this route.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { requireAuth, requireSuperAdmin };
