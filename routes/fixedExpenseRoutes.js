const express = require('express');
const router = express.Router();
const { createFixedExpense, getFixedExpense, deleteFixedExpense, updateFixedExpense } = require('../controllers/fixedExpenseController');

// Route to create a new fixed expense
router.post('/', createFixedExpense);
router.get('/', getFixedExpense);
router.delete('/:id', deleteFixedExpense);  // `id` is passed as a URL parameter
router.patch('/:id', updateFixedExpense);  // `id` is passed as a URL parameter for updating

module.exports = router;
