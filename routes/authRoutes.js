const express = require('express');
const router = express.Router();
const { createSuperAdmin, signInUser } = require('../controllers/authController');

router.post('/create-super-admin', createSuperAdmin);
router.post('/signin', signInUser);

module.exports = router;
