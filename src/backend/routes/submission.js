const express = require('express');
const router = express.Router();
const Submission = require('../models/submissions');

// Middleware to simulate authentication (you can replace with actual auth)
const fakeAuth = (req, res, next) => {
  req.user = { id: '60d0fe4f5311236168a109ca' }; // Replace with actual user id
  next();
};

// Get all submissions by problemId
router.get('/', fakeAuth, async (req, res) => {
  const { problemId } = req.query;
  try {
    const submissions = await Submission.find({ 
  userId: req.user.id, 
  problemId: problemId  // keep as string
}).sort({ createdAt: -1 });


    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Save new submission
router.post('/', fakeAuth, async (req, res) => {
  try {
    const newSubmission = new Submission({
      userId: req.user.id,
      problemId: req.body.problemId,
      code: req.body.code,
      language: req.body.language,
      status: req.body.status,
      testResults: req.body.testResults,
      executionTime: req.body.executionTime,
    });

    const saved = await newSubmission.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
