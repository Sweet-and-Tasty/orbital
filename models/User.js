const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  credits: {
    type: Number,
    default: 0,
  },
  profiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "event",
    },
  ],
});

module.exports = User = mongoose.model("user", UserSchema);
