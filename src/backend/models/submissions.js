const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  problemId: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  status: { type: String, required: true },
  testResults: { type: Array, required: true },
  executionTime: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
