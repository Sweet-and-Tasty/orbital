const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(400).json({ msg: "this user does not exist" });
    }
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route get api/users/find/:id
//@desc get user by id
//@access Private
router.get("/find/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(400).json({ msg: "this user does not exist" });
    }
    return res.json(user);
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
        process.env.jwtSecret,
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

//@route POST api/users/event/:id
//@desc add event id into user's events array
//@access Private

router.post("/event/:id", auth, async (req, res) => {
  const { _id } = req.body;

  //see if user has already registered for event
  let user = await User.findById(req.params.id);
  if (user.events.includes(_id)) {
    return res.status(400).json({ msg: "user already registered for event" });
  }

  try {
    //see if user exist
    user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          events: _id,
        },
      },
      { new: true }
    );

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "server error" });
  }
});

//@route POST api/users/remove-event/:id
//@desc remove event id from user's events array
//@access Private

router.post("/remove-event/:id", auth, async (req, res) => {
  const { _id } = req.body;

  try {
    //see if user exist
    let user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          events: _id,
        },
      },
      { new: true }
    );
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "server error" });
  }
});

//@route POST api/users/profiles/:id
//@desc add profile Id to user
//@access Private

router.post("/profiles/:id", auth, async (req, res) => {
  const { _id } = req.body;
  console.log(req.body._id);

  try {
    //see if user exist
    let user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          profiles: _id,
        },
      },
      { new: true }
    );

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "server error" });
  }
});

//@route POST api/users/profiles/:id
//@desc remove profile Id from user
//@access Private

router.post("/remove-profile/:id", auth, async (req, res) => {
  const { _id } = req.body;
  console.log(req.body._id);

  try {
    //see if user exist
    let user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          profiles: _id,
        },
      },
      { new: true }
    );

    return res.json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
