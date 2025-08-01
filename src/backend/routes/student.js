// GET /students/:studentid/points
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Peer2peer=require("../models/peer2peer");
const Submission= require("../models/submission");
// GET /students/:studentid/invitations
router.get("/students/:studentid/invitations", async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentid);

    const invitations = await Peer2peer.find({
      opponentId: studentId,
      status: "pending" // Optional: Filter only pending invites
    });

    const formattedInvites = invitations.map((invite) => ({
      id: invite._id,
      message: `You were invited to solve Problem ${invite.problemId} by Student ${invite.challengerId}`,
      peerChallengeId: invite._id,
      challengerId: invite.challengerId,
      problemId: invite.problemId,
    }));

    res.json(formattedInvites);
  } catch (err) {
    console.error("Error fetching invitations:", err);
    res.status(500).json({ error: "Server error fetching invitations" });
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
      accuracy:` ${accuracy}%`
    });
  } catch (err) {
    console.error("Error fetching student progress:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


module.exports = router;