const express = require('express');
const router = express.Router();
const { createRecurringExpense, getRecurringExpenses, getRecurringExpenseById } = require('../controllers/recurringExpenseController');

router.post('/', createRecurringExpense);
router.get('/', getRecurringExpenses);
router.get('/:id', getRecurringExpenseById);

module.exports = router;
