const express = require('express');
const router = express.Router();
const { createFixedExpense } = require('../controllers/fixedExpenseController');

// Route to create a new fixed expense
router.post('/', createFixedExpense);

module.exports = router;
