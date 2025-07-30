const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Counter = require("./contest");

const mentorSchema = new mongoose.Schema({
  mentorid: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  joinedAt: { type: Date, default: Date.now },
  courseIds: [String]
});

mentorSchema.pre("save", async function (next) {
  const mentor = this;

  if (mentor.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "mentorid" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    mentor.mentorid = counter.seq;
  }

  if (!mentor.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    mentor.password = await bcrypt.hash(mentor.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("Mentor", mentorSchema);
