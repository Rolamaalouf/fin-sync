const express = require('express');
const router = express.Router();
const {  createRecurringIncome, getRecurringIncome, getRecurringIncomeById} = require('../controllers/recurringIncomeController');

router.post('/', createRecurringIncome);
router.get('/', getRecurringIncome);
router.get('/:id',  getRecurringIncomeById)

module.exports = router;
