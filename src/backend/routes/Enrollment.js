const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");

// POST /api/enroll
router.post("/", async (req, res) => {
  try {
    const { courseid, coursetitle, studentid, studentname } = req.body;

    const newEnrollment = new Enrollment({
      courseid,
      coursetitle,
      studentid,
      studentname,
    });

    await newEnrollment.save();
    res.status(201).json({ message: "Enrollment successful!" });
  } catch (error) {
    console.error("Error during enrollment:", error);
    res.status(500).json({ error: "Enrollment failed" });
  }
});

module.exports = router;
