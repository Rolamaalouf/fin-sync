const express = require('express');
const router = express.Router();
const { createRecurringIncome } = require('../controllers/recurringIncomeController');

router.post('/recurring-incomes', createRecurringIncome);

module.exports = router;
