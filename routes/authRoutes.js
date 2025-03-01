const express = require('express');
const router = express.Router(); // Initialize the router
const { createSuperAdmin } = require('../controllers/authController');
const supabase = require ('../db').supabase

router.post('/create-super-admin', createSuperAdmin);
router.post('/signin', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the request body

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Rest of your code...
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
  module.exports = router;
