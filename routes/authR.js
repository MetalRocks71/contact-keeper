const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth')
const { check, validatorResult } = require('express-validator');

// 1 @route  GET  /api/auth
// 2 @description Get logged in User
// 3 @access Private 'cos is to get the user data
router.get('/', auth, async (req, res) =>{
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    if(!user)
      return res.status(400).json({msg: 'The user does not exist'})
  }
  });


// 1 @route  POST /api/auth
// 2 @description auth User && get token
// 3 @access Public 'cos is to authenticaton the token

router.post('/' , [(check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Please enter a password').exists())
],
  
  //! add the validation method
  async (req, res) => {
    const error = validatorResult(req);
    if (error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;
    //! search for the user and return error if not found
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credential' });
      }
      //! compare password if no match return error message
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credential' });
      }

      //!if does match send the token
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
          if (err) throw err;
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
