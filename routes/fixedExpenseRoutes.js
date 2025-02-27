const express = require('express');
const router = express.Router();
const { createFixedExpense } = require('../controllers/fixedExpenseController');

router.post('/fixed-expenses', createFixedExpense);

module.exports = router;
