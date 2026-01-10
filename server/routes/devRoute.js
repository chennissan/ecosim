const express = require('express');
const router = express.Router();
const User = require('../models/user');
const verifyToken = require('../middleware/authMiddleware');

// Generate test items (development only)
// Items feature removed: provide a stub route
router.post('/test-data', verifyToken(), async (req, res) => {
  try {
    const users = await User.countDocuments();
    res.json({ message: 'Items feature removed; no test data created', usersCount: users });
  } catch (error) {
    res.status(500).json({ error: 'Error in dev route', details: error.message });
  }
});

module.exports = router;
