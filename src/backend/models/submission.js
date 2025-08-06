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
  languageId: Number,
  status: {
    type: String,
    enum: ["Accepted", "Wrong Answer", "Runtime Error", "Compilation Error"],
    required: true,
  },
  testResults: [testResultSchema],
  executionTime: { type: Date, default: Date.now },
  studentId: Number // or: mongoose.Schema.Types.ObjectId if linking to Student model
});

module.exports = mongoose.model("Submission", submissionSchema);
