const express = require("express");
const router = express.Router();
const Problem = require("../../models/Problem");

// POST: Add a new problem
router.post("/add", async (req, res) => {
  try {
    const problem = new Problem(req.body);
    console.log("📦 Received payload:", req.body);
    await problem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// GET: Fetch all problems
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();
    // console.log(problems)
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Get all unique topics and company tags
router.get("/tags", async (req, res) => {
  try {
    const problems = await Problem.find({}, { prerequisites: 1, companyTags: 1 });

    const topicSet = new Set();
    const companySet = new Set();

    problems.forEach((problem) => {
      (problem.prerequisites || []).forEach((topic) => topicSet.add(topic));
      (problem.companyTags || []).forEach((company) => companySet.add(company));
    });

    res.json({
      topics: Array.from(topicSet),
      companies: Array.from(companySet)
    });
    console.log(topicSet);
  } catch (err) {
    console.error("Error fetching tags:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
