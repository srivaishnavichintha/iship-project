// routes/submission.js
const express = require("express");
const router = express.Router();
const Submission = require("../models/submission");
const auth=require('./auth');

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
router.post("/submissions/:studentid", auth, async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentid);
    const { problemId, code, language, status, testResults, executionTime } = req.body;
    console.log(req.studentId);
    const newSubmission = new Submission({
      problemId,
      code,
      language,
      status,
      testResults,
      executionTime,
      studentId // from auth middleware
    });

    await newSubmission.save();
    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(500).json({ message: "Error saving submission" });
  }
});


module.exports = router;
