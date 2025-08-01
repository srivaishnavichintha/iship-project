// models/Problem.js
const mongoose = require("mongoose");
const Counter = require("./counter");

const problemSchema = new mongoose.Schema({
  problemId: {
    type: Number,
    unique: true,
    default: 0
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
  if (!this.problemId) {
    try {
      const result = await Counter.findOneAndUpdate(
        { id: "problemid" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      if (!result) throw new Error("Counter document not found or failed to update");
      this.problemId = result.seq;
      next();
    } catch (err) {
      next(err); // propagate error to catch block in the route
    }
  } else {
    next();
  }
});






module.exports = mongoose.model("Problem", problemSchema);
