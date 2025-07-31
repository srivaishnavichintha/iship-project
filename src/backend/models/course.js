const mongoose = require("mongoose");
const Counter = require("./counter"); // Make sure the path is correct

const courseSchema = new mongoose.Schema({
  courseid: { type: Number, unique: true }, // Use Number for increment
  coursename: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true
  },
 enrollmentend: { type: Date, required: true },
  max_participants: { type: Number, required: true },
  prerequisites: [String],
  createdAt: { type: Date, default: Date.now },

});

// Auto-increment logic
courseSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const counter = await Counter.findOneAndUpdate(
      { id: "courseid" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.courseid = counter.seq;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Course", courseSchema);
