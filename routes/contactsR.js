const express = require('express');
const router = express.Router();

// 1 @route  GET  /api/contacts
// 2 @description GET all user contacts
// 3 @access Private
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

// 1 @route  POST  /api/contacts
// 2 @description add contacts
// 3 @access Private
router.post('/', (req, res) => {
  res.send('Post to add contacts');
});
//! For the put and delete method you must specify what you want to update or delete here is per 'id'
// 1 @route  PUT  /api/contacts:id 
// 2 @description update existing contacts
// 3 @access Private
router.put('/:id', (req, res) => {
  res.send('Update existing contacts');
});

// 1 @route  delete  /api/contacts:id
// 2 @description delete existing contacts
// 3 @access Private
router.delete('/:id', (req, res) => {
  res.send('delete existing contacts');
});

module.exports = router;