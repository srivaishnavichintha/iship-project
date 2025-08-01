const express = require("express");
const router = express.Router();
const Problem = require("../../models/Problem");

// POST /mentor/problems/add
router.post("/add", async (req, res) => {
  try {
    const {
      problemtitle,
      description,
      level,
      prerequisites,
      companyTags,
      inputs,
      outputs,
      mentorid
    } = req.body;

    if (!mentorid || !problemtitle || !description || !level || !inputs || !outputs) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newProblem = new Problem({
      problemtitle,
      description,
      level,
      prerequisites,
      companyTags,
      inputs,
      outputs,
      mentorid
    });

    await newProblem.save();
    res.status(201).json({ message: "Problem added successfully", problem: newProblem });
  } catch (err) {
    console.error("Error adding problem:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// ✅ GET /mentor/problems/tags
router.get("/tags", async (req, res) => {
  try {
    const problems = await Problem.find();
    const allTopics = new Set();
    const allCompanies = new Set();

    problems.forEach(p => {
      (p.prerequisites || []).forEach(tag => allTopics.add(tag));
      (p.companyTags || []).forEach(tag => allCompanies.add(tag));
    });

    res.json({
      topics: Array.from(allTopics),
      companies: Array.from(allCompanies)
    });
  } catch (err) {
    console.error("Error fetching tags:", err);
    res.status(500).json({ message: "Failed to fetch tags", error: err.message });
  }
});

// ✅ GET /mentor/problems — fetch all problems
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    console.error("Error fetching problems:", err);
    res.status(500).json({ message: "Failed to fetch problems", error: err.message });
  }
});




module.exports = router;
