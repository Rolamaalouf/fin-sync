const express = require('express');
const router = express.Router();
const { createRecurringExpense } = require('../controllers/recurringExpenseController');

router.post('/recurring-expenses', createRecurringExpense);

module.exports = router;
