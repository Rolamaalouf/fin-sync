const express = require('express');
const router = express.Router();
const { createRecurringExpense } = require('../controllers/recurringExpenseController');

router.post('/', createRecurringExpense);

module.exports = router;
