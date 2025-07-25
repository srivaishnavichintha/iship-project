import express from "express";
import Problem from "../models/Problem.js";

const router = express.Router();

// Add new problem
router.post("/", async (req, res) => {
  try {
    const newProblem = new Problem(req.body);
    await newProblem.save();
    res.status(201).json({ message: "Problem saved!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all problems
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
