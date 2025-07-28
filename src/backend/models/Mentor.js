const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const mentorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // To avoid duplicate emails
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
  if (!this.isModified("password")) return next(); // skip if password is unchanged
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
module.exports= mongoose.model("Mentor", mentorSchema);
