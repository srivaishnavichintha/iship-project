// models/Submission.js
const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema({
  input: String,
  expected: String,
  actual: String,
  passed: Boolean,
});

const submissionSchema = new mongoose.Schema({
  problemId: Number,
  code: String,
  language: String,
  status: { type: String, enum: ["Accepted", "Wrong Answer", "Runtime Error", "Compilation Error"], required: true },
  testResults: [testResultSchema],
  executionTime: Date,
  studentId: Number, // optional: if you want to track who submitted
});

module.exports = mongoose.model("Submission", submissionSchema);
