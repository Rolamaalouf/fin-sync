const express = require('express');
const router = express.Router();
const { createProfitGoal } = require('../controllers/profitGoalController');

router.post('/profit-goals', createProfitGoal);

module.exports = router;