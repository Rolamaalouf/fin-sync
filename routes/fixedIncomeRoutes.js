const express = require('express');
const router = express.Router();
const { createFixedIncome } = require('../controllers/fixedIncomeController');

router.post('/', createFixedIncome);

module.exports = router;
