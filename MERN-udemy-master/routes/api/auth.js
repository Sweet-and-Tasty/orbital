const express = require('express');
const router = express.Router(); // to use the router
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route       GET api/auth
// @desc        Test route
// @access      Public
router.get('/', auth, async (req, res) => {
  try {
    // get back user data if auth is correct
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// CREATE USER AUTHENTICATION & LOGIN ROUTE
// @route       POST api/auth
// @desc        Authenticate user & get token   WE ARE DOING LOGIN HERE
// @access      Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        // 400 is bad request
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (!user) {
        // no user send error
        return res
          .status(400) // 400 is bad request
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // To make sure that user password matches, use bcrypt(method: compare); takes plain text password and encrypted password and compare to see if its a match
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400) // 400 is bad request
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }

      // Return jsonwebtoken
      const payload = {
        // payload that includes the user.id
        user: {
          id: user.id // mongoose have an abstraction so can just do .id dont need to do ._id
        }
      };

      jwt.sign(
        payload, // pass in payload
        config.get('jwtSecret'), // pass in secret
        {
          expiresIn: 360000 // this should expire in an hour (3600) when deployed. for testing, we will give it more hours
        },
        (err, token) => {
          // callback gets an error or token
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
