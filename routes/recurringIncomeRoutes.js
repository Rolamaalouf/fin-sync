const express = require('express');
const router = express.Router();
const {  createRecurringIncome, getRecurringIncome, getRecurringIncomeById,updateRecurringIncome, deleteRecurringIncome } = require('../controllers/recurringIncomeController');

router.post('/', createRecurringIncome);
router.get('/', getRecurringIncome);
router.get('/:id',  getRecurringIncomeById)
router.put('/:id', updateRecurringIncome);
router.delete('/:id', deleteRecurringIncome);

module.exports = router;
