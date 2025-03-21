const express = require('express');
const router = express.Router();
const { createSuperAdmin, signInUser, createAdmin, signupAdmin, signOutuser, getAllAdmins, deleteAdmin} = require('../controllers/authController');
const { requireSuperAdmin, requireAuth } = require('../utils/auth');

router.post('/create-super-admin', createSuperAdmin);
router.post('/signin', signInUser);
router.post('/create-admin', requireSuperAdmin, createAdmin); 
router.post('/signup-admin', signupAdmin); // Admins can sign up without approval
router.post('/signout' , signOutuser);
router.get('/admins', requireAuth, requireSuperAdmin, getAllAdmins);
router.delete('/admin/:adminId', requireAuth, requireSuperAdmin, deleteAdmin);

module.exports = router;
