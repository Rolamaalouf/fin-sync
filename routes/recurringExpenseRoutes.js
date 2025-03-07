const express = require('express');
const router = express.Router();
const { createRecurringExpense, getRecurringExpenses, getRecurringExpenseById,updateRecurringExpense, deleteRecurringExpense  } = require('../controllers/recurringExpenseController');

router.post('/', createRecurringExpense);
router.get('/', getRecurringExpenses);
router.get('/:id', getRecurringExpenseById);
router.put('/:id', updateRecurringExpense);
router.delete('/:id', deleteRecurringExpense);

module.exports = router;
