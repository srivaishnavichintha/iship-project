const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const Submission = require("../models/submission");

// ✅ GET /api/problems/:problemId
router.get("/solve/:problemId", async (req, res) => {
  try {
    const numericProblemId = Number(req.params.problemId);
    console.log(numericProblemId);
    if (isNaN(numericProblemId)) {
      return res.status(400).json({ error: "Invalid problemId" });
    }

   console.log("Searching for problemId:", numericProblemId);
const problem = await Problem.findOne({ problemId: numericProblemId });
console.log("Found problem:", problem);


    res.json({
      title: problem.problemtitle,
      description: problem.description,
      level: problem.level,
      topics: problem.prerequisites || [],
      companies: problem.companyTags || [],
      examples: problem.examples || [],  // ✅ include examples here if needed
    });
  } catch (err) {
    console.error("Problem fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST /api/submissions
router.post("/submissions", async (req, res) => {
  try {
    const { problemId } = req.body;

    if (!problemId || isNaN(Number(problemId))) {
      return res.status(400).json({ error: "Invalid or missing problemId" });
    }

    const submission = new Submission({
      ...req.body,
      problemId: Number(problemId), // ensure it's saved as a number
    });

    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    console.error("Submission error:", err);
    res.status(500).json({ error: "Failed to save submission" });
  }
});

// ✅ GET /api/submissions?problemId=123
router.get("/submissions", async (req, res) => {
  try {
    const numericProblemId = Number(req.query.problemId);
    if (isNaN(numericProblemId)) {
      return res.status(400).json({ error: "Invalid problemId" });
    }

    const submissions = await Submission.find({ problemId: numericProblemId }).sort({ executionTime: -1 });
    res.json(submissions);
  } catch (err) {
    console.error("Submission fetch error:", err);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

module.exports = router;
