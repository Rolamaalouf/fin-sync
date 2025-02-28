// const express = require('express');
// const router = express.Router();
// const { createProfitGoal } = require('../controllers/profitGoalController');

// router.post('/profit-goals', createProfitGoal);

// module.exports = router;

const express = require('express');
const router = express.Router();
const ProfitGoal = require('../models/profitGoal'); // Import your ProfitGoal model

// POST route for creating a new profit goal
router.post('/', async (req, res) => {
  try {
    const { amount, targetDate, adminId } = req.body;

    // Create a new ProfitGoal instance
    const profitGoal = new ProfitGoal(amount, targetDate, adminId);

    // Save to database
    const result = await profitGoal.save();

    res.status(201).json({
      message: 'Profit Goal created successfully',
      data: result
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating profit goal',
      error: error.message
    });
  }
});

// Optionally, you can add a GET route to fetch all profit goals or a specific one

module.exports = router;