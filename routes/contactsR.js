const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validatorResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contacts');
const { restart } = require('nodemon');

//* 1 @route  GET  /api/contacts
//* 2 @description GET all user contacts
//* 3 @access Private
//* 4 @adding auth middleware to handle secure authorization and connection
//* 5 @find the contact by the object id requested by the user 'user: req.user.id '
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
});

//* 1 @route  POST  /api/contacts
//* 2 @description add contacts
//* 3 @access Private
//* 4 @adding the check middleware to check the identity of the user to add the contacts

router.post(
  '/',
  [auth,  [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const error = validatorResult(req);
    if (error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    //! retrieve the data from the body schema and pass it to the callback
    const { email, name, phone, type } = req.body;

    try {

      const newContact = Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id, //* to be added due to the auth middleware above
      });

      const contact = await newContact
        .save() //* to save the new contact in the database
        .res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
//! For the put and delete method you must specify what you want to update or delete here is per 'id'

//* 1 @route  PUT  /api/contacts:id
//* 2 @description update existing contacts
//* 3 @access Private

router.put('/:id', auth , async (req, res) => {
  const {name, email, phone, type} = req.body;

  // Build a contact object as it is an update, so if there is a name, email, phone or type then added to the contact
  const contactFields = {}
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone= phone
    if (type) contactFields.type = type;

    try {
      let contact = await Contact.findById(req.params.id); // this will find the contact by id
      if (!contact) return res.status(404).json('Contact not found'); // if not found return 404 status not found error

      // Make sure the user owns the contact, you have to turn the first argument as a string with toString function

      if(contact.user.toString() !== req.user.id)

        return res.status(401).json({msg: 'Not authorizated'})

      //Now we are doing the actual update, if contact not found then create new with {new: true}
      contact = await Contact.findByIdAndUpdate(req.params.id, {$set: contactFields}, {new: true});
    res.json()
    } catch (err) {
        console.error(err.message);
      res.status(500).send('Server Error');
    }

});

// 1 @route  delete  /api/contacts:id
// 2 @description delete existing contacts
// 3 @access Private
router.delete('/:id',auth, async (req, res) => {
      try {
      let contact = await Contact.findById(req.params.id); // this will find the contact by id
      if (!contact) return res.status(404).json('Contact not found'); // if not found return 404 status not found error

      // Make sure the user owns the contact, you have to turn the first argument as a string with toString function

      if(contact.user.toString() !== req.user.id)
        return res.status(401).json({msg: 'Not authorizated'})
      //Now we are doing the actual delete
   await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact deleted'})
    } catch (err) {
        console.error(err.message);
      res.status(500).send('Server Error');
    }
});

module.exports = router;
