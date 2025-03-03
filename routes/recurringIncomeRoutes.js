const express = require('express');
const router = express.Router();
const { createRecurringIncome } = require('../controllers/recurringIncomeController');
const { getAllRecurringIncome } = require('../models/recurringIncome');

router.post('/', createRecurringIncome);
router.get('/', getAllRecurringIncome);

module.exports = router;
