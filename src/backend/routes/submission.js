// routes/submission.js
const express = require("express");
const router = express.Router();
const Submission = require("../models/submission");

// Middleware to get student ID from token (dummy version for now)
const auth = (req, res, next) => {
  // You’d normally verify token here
  req.studentId = 1234; // replace this with actual extracted student ID
  next();
};

router.get("/submissions", auth, async (req, res) => {
  const { problemId } = req.query;
  try {
    const submissions = await Submission.find({
      problemId: parseInt(problemId),
      studentId: req.studentId,
    }).sort({ executionTime: -1 });

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching submissions" });
  }
});

// routes/submission.js
router.post("/", auth, async (req, res) => {
  try {
    const { problemId, code, language, status, testResults, executionTime } = req.body;

    const newSubmission = new Submission({
      problemId,
      code,
      language,
      status,
      testResults,
      executionTime,
      studentId: req.studentId, // from auth middleware
    });

    await newSubmission.save();
    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(500).json({ message: "Error saving submission" });
  }
});


module.exports = router;
