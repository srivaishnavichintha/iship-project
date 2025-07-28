const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseid: { type: String, required: true , unique:true},
  coursename: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  level: { 
    type: String, 
    enum: ["Beginner", "Intermediate", "Advanced"], 
    required: true 
  },
  enrollementend: { type: Date, required: true },
  max_participants: { type: Number, required: true },
  prerequisites: [String],
  createdAt: { type: Date, default: Date.now }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;