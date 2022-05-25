const express = require('express');
const router = express.Router(); // to use the router
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const { restart } = require('nodemon');

// bring in our user model
const User = require('../../models/User'); // ../../ is up two

// @route       POST api/users
// @desc        Register user
// @access      Public
router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        // 400 is bad request
        errors: errors.array()
      });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] }); // 400 is bad request
      }

      // // Get user's gravatar
      // const avatar = gravatar.url(email, {
      //   s: '200', // size
      //   r: 'pg', // rating , cant have any naked people etc
      //   d: 'mm' //dafault
      // });

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      // create the user
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt/ hash the password
      const salt = await bcrypt.genSalt(10); // 10 is recommended in the documentation

      user.password = await bcrypt.hash(password, salt); // this is the user that is getting saved

      await user.save(); // promise, save the user in the database

      // Return jsonwebtoken
      const payload = {
        // ppayload that includes the user.id
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
