const express = require('express');
const { getReport } = require('../controllers/reportController'); // Assuming the report logic is inside a controller
const router = express.Router();

// Define the route for generating the report
router.get('/', getReport);  // The getReport function will be responsible for fetching and returning the report data

module.exports = router;
