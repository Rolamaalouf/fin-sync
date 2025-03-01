const express = require('express');
const router = express.Router();
const { createProfitGoal, getProfitGoals } = require('../controllers/profitGoalController');
const { requireAuth, requireSuperAdmin } = require('../utils/auth');

router.post('/', requireAuth, requireSuperAdmin, createProfitGoal);
router.get('/', requireAuth, getProfitGoals);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;

>>>>>>> 5570bfbb2bc98c8c1d1fe914b9d24b0237e34169
