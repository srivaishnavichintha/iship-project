// GET /students/:studentid/points
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Peer2peer=require("../models/peer2peer");
const Submission= require("../models/submission");
router.get("/students/:studentid/points", async (req, res) => {
  try {
    const { studentid } = req.params;

    const student = await Student.findOne({ studentid: parseInt(studentid) });

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    console.log(student.points);
    res.json({ points: student.points || 0 });
  } catch (err) {
    console.error("Error fetching student points:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// To send the student progress
router.get("/student-progress/:studentid", async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentid);

    // 1. Count of P2P contests where student was either challenger or opponent
    const contestsAttended = await Peer2peer.countDocuments({
      $or: [{ challengerId: studentId }, { opponentId: studentId }]
    });

    // 2. Total submissions by student
    const totalSubmissions = await Submission.countDocuments({ studentId });

    // 3. Accepted submissions
    const acceptedSubmissions = await Submission.countDocuments({
      studentId,
      status: "Accepted"
    });

    // 4. Calculate accuracy
    const accuracy =
      totalSubmissions > 0
        ? ((acceptedSubmissions / totalSubmissions) * 100).toFixed(2)
        : "0.00";

    // 5. Send response
    res.json({
      contestsAttended,
      problemsSolved: acceptedSubmissions,
      accuracy: `${accuracy}%`
    });
  } catch (err) {
    console.error("Error fetching student progress:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

router.get("/submissions/:studentId", async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId);

    const submissions = await Submission.find({ studentId }).sort({ executionTime: -1 });

    res.status(200).json(submissions);
  } catch (err) {
    console.error("Error fetching student submissions:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
