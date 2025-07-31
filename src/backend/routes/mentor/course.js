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
// GET /mentor/courses/:mentorid
router.get("/mentor/courses/:mentorid", async (req, res) => {
  try {
    const { mentorid } = req.params;
    const courses = await Course.find({ mentorid: mentorid });
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
