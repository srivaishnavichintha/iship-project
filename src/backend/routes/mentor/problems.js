const express = require("express");
const router = express.Router();
const Problem = require("./problems");

// POST: Add a new problem
router.post("/add", async (req, res) => {
  try {
    const problem = new Problem(req.body);
    console.log(req.body,problem);
    await problem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: Fetch all problems
// router.get("/", async (req, res) => {
//   try {
//     const problems = await Problem.find();
//     res.json(problems);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

module.exports = router;
