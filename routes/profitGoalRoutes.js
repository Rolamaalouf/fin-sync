const express = require('express');
const router = express.Router();
const { createProfitGoal, getProfitGoals } = require('../controllers/profitGoalController');
const { requireSuperAdmin, requireAuth } = require('../utils/auth');

router.post('/', requireAuth, requireSuperAdmin, createProfitGoal);
router.get('/', getProfitGoals);

module.exports = router;
