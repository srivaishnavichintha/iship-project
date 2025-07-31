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

    // Validation
    if (!mentorid || !problemtitle || !description || !level || !inputs || !outputs) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Do not send problemId manually — let schema handle it
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

    await newProblem.save(); // ⚠️ Triggers pre('save') hook

    res.status(201).json({ message: "Problem added successfully", problem: newProblem });
  } catch (err) {
    console.error("Error adding problem:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});


module.exports = router;
