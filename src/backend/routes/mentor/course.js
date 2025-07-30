const express = require("express");
const router = express.Router();
const Course = require("../../models/course");

// GET /upcoming-course
router.get("/upcoming-course", async (req, res) => {
  try {
    const now = new Date();
    const upcomingCourses = await Course.find({ enrollmentend: { $gt: now } });
    // console.log("📤 Sending courses:", upcomingCourses);
    res.status(200).json(upcomingCourses);
  } catch (err) {
    console.error("Error fetching upcoming courses:", err);
    res.status(500).json({ error: "Failed to fetch upcoming courses" });
  }
});

module.exports = router;
