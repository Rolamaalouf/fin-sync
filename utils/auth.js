const jwt = require('jsonwebtoken'); // Import JWT for token verification
const dotenv = require('dotenv');
dotenv.config();
const supabase = require('../db').supabase; // Import Supabase client

const requireAuth = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'You must be logged in.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    // Fetch user data from Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', decoded.id)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    // Attach user data to request
    req.user = user;

    next(); // Move to the next middleware
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Middleware to check if user is a Super Admin
const requireSuperAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'superAdmin') {
      return res.status(403).json({ error: 'Only super admins can access this route.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { requireAuth, requireSuperAdmin };