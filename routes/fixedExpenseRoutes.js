const express = require('express');
const router = express.Router();
const { createFixedExpense, getFixedExpense } = require('../controllers/fixedExpenseController');

// Route to create a new fixed expense
router.post('/', createFixedExpense);
router.get('/', getFixedExpense);
module.exports = router;
