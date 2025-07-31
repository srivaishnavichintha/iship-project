const mongoose = require("mongoose");
const Counter = require("./counter"); // Ensure the path is correct
const contestSchema = new mongoose.Schema({
  contestid: {
    type: Number,
    unique: true
  },
  contesttitle: {
    type: String,
    required: true,
    trim: true
  },
  contestdate: {
    type: Date,
    required: true
  },
  conteststatus: {
    type: String,
    enum: ['upcoming', 'live','completed'],  // keep lowercase enums
    default: 'upcoming',
    required: true
  },
  contestdifficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],  // lowercase values since you're using lowercase:true
    required: true
  },
  contestdescription: {
    type: String,
    required: true,
    trim: true
  },
  mentorid: {
    type: Number,
    // required: true
  },
  mentorname: {
    type: String,
    required: true,
    trim: true
  },
  createdate: {
    type: Date,
    default: Date.now
  }
});

// Auto-increment contestid
contestSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "contestid" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.contestid = counter.seq;
  }
  next();
});

module.exports = mongoose.model("Contest", contestSchema);
