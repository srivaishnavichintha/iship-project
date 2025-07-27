const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  points: { type: Number, default: 0 },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  joinedAt: { type: Date, default: Date.now },
  password: { type: String, required: true },
  courseIds: [String],
  isactive:{type: Boolean,default:true}
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // skip if password is unchanged
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
module.exports = mongoose.model("Student", studentSchema);
