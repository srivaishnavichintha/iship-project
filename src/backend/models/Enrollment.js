// models/Enrollment.js

const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  courseid: {
    type: String,
    required: true,
  },
  coursetitle: {
    type: String,
    required: true,
  },
  studentid: {
    type: String,
    required: true,
  },
  studentname: {
    type: String,
    required: true,
  },
  isEnrolled: {
    type: Boolean,
    default: true,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
