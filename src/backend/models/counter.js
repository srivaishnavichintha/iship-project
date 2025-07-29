// models/Counter.js

const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,  // ensures one counter per type (e.g., "studentid", "problemid")
  },
  seq: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Counter", counterSchema);
