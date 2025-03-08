const express = require('express');
const router = express.Router();
const { createProfitGoal, getProfitGoals, deleteProfitGoal, patchProfitGoal } = require('../controllers/profitGoalController');
const { requireSuperAdmin, requireAuth } = require('../utils/auth');

router.post('/', requireAuth, requireSuperAdmin, createProfitGoal);
router.get('/', getProfitGoals);
router.delete('/:id', requireAuth,requireSuperAdmin, deleteProfitGoal); 
router.patch('/:id', requireAuth, requireSuperAdmin, patchProfitGoal);


module.exports = router;

