const express = require("express");
const router = express.Router();
const Enrollment = require("../models/Enrollment");
const Course = require("../models/course");

// POST /enroll
router.post("/enroll", async (req, res) => {
  try {
    const { courseid, coursename, studentid } = req.body;

    // Fetch course to get username and enrollmentend
    const course = await Course.findOne({ courseid });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const enrollment = new Enrollment({
      courseid,
      coursename,
      studentid,
      enrollmentend: course.enrollmentend,
      isenrolled: true,
    });

    console.log("Before saving enrollment:", enrollment); // ✅ ensure username is visible here

    await enrollment.save();

    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (err) {
    console.error("Enrollment error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// GET /popular-courses
router.get("/popular-courses", async (req, res) => {
  try {
    const popularCourses = await Enrollment.aggregate([
      { $match: { isenrolled: true } },
      {
        $group: {
          _id: "$courseid",
          coursename: { $first: "$coursename" },
          enrollmentend: { $first: "$enrollmentend" },
          enrolledCount: { $sum: 1 }
        }
      },
      { $sort: { enrolledCount: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          courseid: "$_id",
          coursename: 1,
          enrollmentend: 1,
          enrolledCount: 1
        }
      }
    ]);

    res.status(200).json(popularCourses);
  } catch (err) {
    console.error("Error fetching popular courses:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
