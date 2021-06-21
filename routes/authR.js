const express = require('express');
const router = express.Router();

// 1 @route  GET  /api/auth
// 2 @description Get logged in User
// 3 @access Private 'cos is to get the user data
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// 1 @route  POST /api/auth
// 2 @description auth User && get token
// 3 @access Public 'cos is to authenticaton the token 
router.post('/', (req, res) => {
  res.send('log in user');
});


module.exports = router;