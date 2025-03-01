const express = require('express');
const router = express.Router();
const { createProfitGoal, getProfitGoals } = require('../controllers/profitGoalController');
const { requireSuperAdmin } = require('../utils/auth');

router.post('/', requireSuperAdmin, createProfitGoal);
router.get('/', getProfitGoals);

module.exports = router;
