const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");

//@route get api/profiles/:id
//@desc get profile by id
//@access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(400).json({ msg: "this profile does not exist" });
    }
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route POST api/profiles/
//@desc create profile
//@access Public

router.post(
  "/",
  [check("name", "name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, avatar } = req.body;

    try {
      let profile = new Profile({
        name,
        avatar,
      });
      await profile.save();
      res.json(profile);
      //res.send("User registered");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route POST api/profiles/event/:id
//@desc add event id into user profile's events array
//@access Private

router.post("/event/:id", auth, async (req, res) => {
  const { _id } = req.body;

  let profile = await Profile.findById(req.params.id);
  if (profile.events.includes(_id)) {
    return res
      .status(400)
      .json({ msg: "profile already registered for event" });
  }

  try {
    //see if user exist
    let profile = await Profile.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          events: _id,
        },
      },
      { new: true }
    );

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "server error" });
  }
});

//@route POST api/profiles/remove-event/:id
//@desc remove event id from user profile's events array
//@access Private

router.post("/remove-event/:id", auth, async (req, res) => {
  const { _id } = req.body;

  try {
    //see if user exist
    let profile = await Profile.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          events: _id,
        },
      },
      { new: true }
    );
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "server error" });
  }
});

//@route DELETE api/profiles/:id
//@desc delete profile
//@access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    //see if user exist
    await Profile.findOneAndDelete({ _id: req.params.id });
    const profile = await Profile.find();

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "profile not found" });
    }
    return res.status(500).json({ msg: "server error" });
  }
});

module.exports = router;
