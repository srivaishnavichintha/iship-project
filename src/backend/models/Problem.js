// models/Problem.js
const mongoose = require("mongoose");
const Counter = require("./counter");

const problemSchema = new mongoose.Schema({
  problemid: {
    type: Number,
    unique: true
  },
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
  mentorid: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-increment logic for problemId
problemSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "problemid" },              // tracking "problemid" type
      { $inc: { seq: 1 } },             // increment seq by 1
      { new: true, upsert: true }       // create if doesn't exist
    );
    this.problemid = counter.seq;
  }
  next();
});

module.exports = mongoose.model("Problem", problemSchema);
