const express = require('express');
const router = express.Router();
const { createRecurringIncome } = require('../controllers/recurringIncomeController');

router.post('/', createRecurringIncome);

module.exports = router;
