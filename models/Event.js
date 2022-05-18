const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  startDateTime: {
    type: String,
    required: true,
  },
  endDateTime: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = Event = mongoose.model("event", EventSchema);
