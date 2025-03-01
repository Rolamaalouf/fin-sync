const express = require('express');
const router = express.Router();
const { createProfitGoal, getProfitGoals } = require('../controllers/profitGoalController');
const { requireAuth, requireSuperAdmin } = require('../utils/auth');

router.post('/', requireAuth, requireSuperAdmin, createProfitGoal);
router.get('/', requireAuth, getProfitGoals);

module.exports = router;

