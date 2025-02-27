const express = require('express');
const router = express.Router();
const { getYearlyReport } = require('../controllers/reportController');

router.get('/reports/yearly/:year', getYearlyReport);

module.exports = router;
