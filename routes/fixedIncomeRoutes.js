const express = require('express');
const router = express.Router();
const { createFixedIncome } = require('../controllers/fixedIncomeController');

router.post('/fixed-incomes', createFixedIncome);

module.exports = router;
