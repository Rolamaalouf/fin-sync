const express = require('express');
const router = express.Router();
const { createCategory } = require('../controllers/categoryController');

router.post('/categories', createCategory);

module.exports = router;
