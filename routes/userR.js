const express = require('express');
const router = express.Router();

// 1 @route  POST  /api/users
// 2 @description Register a user
// 3 @access Public (is to become a user)
router.post('/', (req, res) => {
  res.send('Register a user');
});

module.exports = router;