const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Counter = require("./counter"); // Adjust path if needed

const mentorSchema = new mongoose.Schema({
  mentorid: {
    type: Number,
    unique: true
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

mentorSchema.pre('save', async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "mentorid" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.mentorid = counter.seq;
  }

  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Mentor', mentorSchema);
