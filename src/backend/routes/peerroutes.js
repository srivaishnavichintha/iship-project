const express = require("express");
const router = express.Router();
const peers=require("../models/peer")
const Student = require("../models/Student");
const Course = require("../models/course");

// GET /courses/student/:id
router.get("/courses/student/:id", async (req, res) => {
  try {
    const student = await Student.findOne({ studentid: req.params.id }).populate("enrolledCourses", "coursename");

    if (!student) return res.status(404).json({ error: "Student not found" });

    const courseNames = student.enrolledCourses.map(c => c.coursename);
    res.json(courseNames);
  } catch (err) {
    console.error("Error fetching student courses:", err);
    res.status(500).json({ error: "Server error" });
  }
});



// POST /challenge
router.post("/challenge", async (req, res) => {
  try {
    const { challengerId, opponentId, course, datetime } = req.body;

    const newChallenge = new peers({
      challengerId,
      opponentId,
      course,
      datetime
    });

    await newChallenge.save();
    res.status(201).json({ message: "Challenge created", challenge: newChallenge });
  } catch (err) {
    console.error("Error creating challenge:", err);
    res.status(500).json({ error: "Server error" });
  }
});



// GET /history/:studentId
router.get("/history/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const challenges = await peers.find({
      $or: [
        { challengerId: Number(studentId) },
        { opponentId: Number(studentId) }
      ]
    }).sort({ datetime: -1 });

    res.json(challenges);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Server error" });
  }
});



// PUT /challenge/:id/status
router.put("/challenge/:id/status", async (req, res) => {
  try {
    const { status, result } = req.body;
    const updated = await peers.findOneAndUpdate(
      { challengeId: req.params.id },
      { status, result },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Challenge not found" });

    res.json(updated);
  } catch (err) {
    console.error("Error updating challenge:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;