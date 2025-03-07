const express = require('express');
const router = express.Router();
const { createFixedIncome , getFixedIncome, updateFixedIncome, deleteFixedIncome} = require('../controllers/fixedIncomeController');

router.post('/', createFixedIncome);
router.get('/', getFixedIncome);
router.put('/:id', updateFixedIncome);
router.delete('/:id', deleteFixedIncome)
module.exports = router;
