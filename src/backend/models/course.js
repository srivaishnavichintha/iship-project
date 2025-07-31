const mongoose = require("mongoose");
const Counter = require("./counter"); // Make sure the path is correct

const courseSchema = new mongoose.Schema({
  courseid: { type: Number, unique: true },
  coursename: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true
  },
  // username: { type: String, required: true },     // ✅ ADD THIS
  enrollmentend: { type: Date, required: true },
  max_participants: { type: Number, required: true },
  mentorid: { type: Number, ref: "mentor" },  // <-- Added mentorid
  mentorname: { type: String, required: true }, 
  prerequisites: [String],
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Course", courseSchema);
