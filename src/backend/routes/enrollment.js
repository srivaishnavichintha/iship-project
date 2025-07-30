const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");

// POST /enroll
router.post("/enroll", async (req, res) => {
  const { courseid, coursename, studentid } = req.body;
  console.log("Incoming enroll request:", req.body);

  try {
    const existing = await Enrollment.findOne({ courseid, studentid });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = new Enrollment({
      courseid,
      coursename,
      studentid,
      isenrolled: true
    });

    console.log("Before saving enrollment:", enrollment);

    await enrollment.save(); // 🔥 Hook should fire here

    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (err) {
    console.error("Enrollment error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
