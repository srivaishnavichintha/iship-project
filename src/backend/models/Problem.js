const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  problemtitle: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true
  },
  prerequisites: {
    type: [String],
    default: []
  },
  companyTags: {
    type: [String],
    default: []
  },
  inputs: {
    type: [String],
    required: true
  },
  outputs: {
    type: [String],
    required: true
  },
  mentorId: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;
