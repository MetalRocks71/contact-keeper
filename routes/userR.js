const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validatorResult } = require('express-validator');
const bcrypt = require('bcrypt');


// 1 @route  POST  /api/users
// 2 @description Register a user
// 3 @access Public (is to become a user)

router.post(
  '/',
  [
    check('name', 'Please add a name').not().isEmpty(),
    check('email', 'Please include a valid email address').isEmail(),
    check('password', 'Password is minimun 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const error = validatorResult(req);
    if (error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    const { name, email, password } = req.body;
    //! find the user per email
    try {
      let user = await User.findOne({ email });

      //!if user already exists return error message
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      //! Creating the user (not in the database yet)

      user = new User({
        name,
        email,
        password,
      });

      //! Encrypt the password using salt and hash and set the number of rounds (10)

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //! then await the user.save()

      await user.save();

      //! Create the paylaod is the object to be sent in the token, with the user id we can access all the contacts and gets specifics base on that id.
      const payload = {
        user: {
          id: user.id,
        },
      };
      //! To access and generate the token we need to sign in it with JWT
      //! create a jwtSecret in the config file then add an object that expires in the future
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (error) throw error;
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
