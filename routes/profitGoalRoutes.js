const express = require('express');
const router = express.Router();
const { createProfitGoal } = require('../controllers/profitGoalController');
const { requireAuth, requireSuperAdmin } = require('../utils/auth');

// Route to create a new profit goal
router.post('/', requireAuth, requireSuperAdmin, createProfitGoal);

module.exports = router;