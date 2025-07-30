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

// GET /my-mentor-courses?mentorid=123
router.get("/my-mentor-courses", async (req, res) => {
  const { mentorid } = req.query;

  if (!mentorid) {
    return res.status(400).json({ message: "Mentor ID is required" });
  }

  try {
    const courses = await Course.find({ mentorid });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching mentor courses:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
