const express = require('express');
const router = express.Router();
const { createFixedIncome , getFixedIncome} = require('../controllers/fixedIncomeController');

router.post('/', createFixedIncome);
router.get('/', getFixedIncome);

module.exports = router;
