const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { accepts } = require("express/lib/request");
const {
  isValidDate,
  isValidISODateString,
  isValidTime,
  isValidYearMonth,
} = require("iso-datestring-validator");
//const auth = require("../../middleware/auth");
const Event = require("../../models/Event");
const auth = require("../../middleware/auth");

//@route POST api/event
//@desc create a event
//@access Private

router.post(
  "/",
  auth,
  [
    check("startDateTime", "start date and time in ISO format required").custom(
      (value) => {
        return isValidISODateString(value);
      }
    ),
    check("endDateTime", "end date and time in ISO format required").custom(
      (value) => {
        return isValidISODateString(value);
      }
    ),
    check("title", "enter a title for event").not().isEmpty(),
    check("address", "enter an address for event").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { startDateTime, endDateTime, title, address, description, image } =
      req.body;
    try {
      const newEvent = new Event({
        startDateTime,
        endDateTime,
        title,
        address,
        description,
        image,
        creator: req.user.id,
      });
      const event = await newEvent.save();
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route GET api/event
//@desc get all events
//@access Public
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route GET api/event/:id
//@desc get event by Id
//@access Public
router.get("/:id", async (req, res) => {
  try {
    const events = await Event.findById(req.params.id);
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route POST api/event/:id
//@desc update a event
//@access Private

router.post(
  "/:id",
  auth,
  [
    check("startDateTime", "start date and time in ISO format required").custom(
      (value) => {
        return isValidISODateString(value);
      }
    ),
    check("endDateTime", "end date and time in ISO format required").custom(
      (value) => {
        return isValidISODateString(value);
      }
    ),
    check("title", "enter a title for event").not().isEmpty(),
    check("address", "enter an address for event").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { startDateTime, endDateTime, title, address, description, image } =
      req.body;
    try {
      let event = await Event.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            startDateTime,
            endDateTime,
            title,
            address,
            description,
            image,
          },
        },
        { new: true }
      );
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route POST api/event/feedback/:id
//@desc post feedback for event
//@access Private

router.post("/feedback/:id", auth, async (req, res) => {
  const { text } = req.body;
  try {
    let event = await Event.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          feedback: {
            poster: req.user.id,
            text,
          },
        },
      },
      { new: true }
    );
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
