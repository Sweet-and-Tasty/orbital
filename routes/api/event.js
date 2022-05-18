const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
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
      console.log(value);
      return isValidISODateString(value);
    }),
    check("endDateTime", "end date and time required").custom((value) => {
      console.log(req.body.startDateTime);
      return isValidISODateString(value);
    }),
    check("title", "enter a title for event").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { start, end, title, description } = req.body;
    try {
      const newEvent = new Event({
        start: req.body.start,
        end: end,
        title: title,
        description: description,
      });
      const event = await newEvent.save();
      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
