const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

//@route get api/users/:email
//@desc get user's ID by email
//@access public
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne(
      {
        email: req.params.email,
      },
      {
        _id: 1,
      }
    );
    if (!user) {
      return res.status(400).json({ msg: "this user does not exist" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route get api/users/:id
//@desc get user by id
//@access Private
router.get(":id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "this user does not exist" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route POST api/users
//@desc register user
//@access Public
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "please include email").isEmail(),
    check("password", "enter a password with 6 or more characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //see if user exist
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exist" }] });
      }

      //get users gravatar
      const avatar = gravatar.url(email, {
        s: "200", //size
        r: "pg", // rating
        d: "mm", //idk
      });
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      //res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route POST api/users/:id
//@desc update user password
//@access Public
router.post(
  "/:id",
  [
    check("newPassword", "enter a password with 6 or more characters").isLength(
      {
        min: 6,
      }
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { newPassword } = req.body;

    try {
      //see if user exist
      let user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ msg: "this user does not exist" });
      }

      //encrypt password using bcrypt
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      await user.save();

      res.send(newPassword);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
