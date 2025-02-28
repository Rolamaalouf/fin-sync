const express = require('express');
const router = express.Router();
const { createAdmin, updateAdmin, deleteAdmin, signUpAdmin } = require('../controllers/adminController');
const { requireAuth, requireSuperAdmin } = require('../utils/auth');

// Route to create an admin (only accessible by super admin)
router.post('/create', requireAuth, requireSuperAdmin, createAdmin);

// Route to update admin info, only accessible by super admins
router.put('/admins/:id', requireAuth, requireSuperAdmin, updateAdmin);

// Route to delete an admin, only accessible by super admins
router.delete('/admins/:id', requireAuth, requireSuperAdmin, deleteAdmin);

// Route for admins to sign up (no auth required)
router.post('/signup', signUpAdmin);

module.exports = router;
