const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Counter = require("./counter"); // Make sure this path is correct

const studentSchema = new mongoose.Schema({
  studentid: {
    type: Number,
    unique: true
  },
  username: { type: String, required: true }, // changed from "username"
  email: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  points: { type: Number, default: 0 },
  enrolledCourses: {
  type: [{ type: String, ref: 'Course' }],
  default: []  // ✅ important
},

  joinedAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
  courseIds: {
    type: [Number],
      default: [],
  },
  isactive: { type: Boolean, default: true }
});

// Auto-increment studentid
studentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "studentid" },         // track student ids separately
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.studentid = counter.seq;
  }

  // Hash password if changed
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Student", studentSchema);
