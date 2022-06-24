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

//@route POST api/event
//@desc create a event
//@access Public

router.post(
  "/",
  [
    check("startDateTime", "start ate and time  required").custom((value) => {
      return isValidISODateString(value);
    }),
    check("endDateTime", "end date and time required").custom((value) => {
      return isValidISODateString(value);
    }),
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

module.exports = router;
