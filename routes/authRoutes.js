const express = require('express');
const router = express.Router();
const { createSuperAdmin, signInUser, createAdmin, signupAdmin, signOutuser} = require('../controllers/authController');
const { requireSuperAdmin } = require('../utils/auth');

router.post('/create-super-admin', createSuperAdmin);
router.post('/signin', signInUser);
router.post('/create-admin', requireSuperAdmin, createAdmin); // ✅ New Route for Super Admin to create Admins
router.post('/signup-admin', signupAdmin); // Admins can sign up without approval
router.post('/signout' , signOutuser);


module.exports = router;
