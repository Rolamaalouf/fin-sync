const express = require('express');
const router = express.Router();
const { createProfitGoal, getProfitGoals, deleteProfitGoal } = require('../controllers/profitGoalController');
const { requireSuperAdmin, requireAuth } = require('../utils/auth');

router.post('/', requireAuth, requireSuperAdmin, createProfitGoal);
router.get('/', getProfitGoals);
router.delete('/:id', requireSuperAdmin, deleteProfitGoal); 

module.exports = router;
