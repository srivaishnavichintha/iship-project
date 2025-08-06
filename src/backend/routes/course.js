const express = require("express");
const router = express.Router();
const Course = require("../models/course");
const Student= require("../models/Student");
const Enrollment=require("../models/Enrollment");

// POST /mentor/courses
router.post("/mentor/courses", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);
    const newCourse = new Course(req.body);
    console.log(req.body);
    await newCourse.save();
    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Error saving course:", error);
    res.status(500).json({ message: "Failed to add course", error: error.message });
  }
});


router.get("/active-courses", async (req, res) => {
  try {
    const currentDate = new Date();
    const activeCourses = await Course.find({
      enrollmentend: { $gte: currentDate }
    });
      // console.log("📤 Sending courses:", activeCourses);

    res.status(200).json({
      activeCourses: activeCourses
    });
  } catch (err) {
    console.error("Error fetching active courses:", err);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// GET enrolled courses by student ID
router.get("/enrolled-courses/:studentid", async (req, res) => {
  const { studentid } = req.params;

  try {
    const student = await Student.findOne({ studentid: parseInt(studentid) });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Find courses by courseid stored in student.courseIds
    const enrolledCourses = await Course.find({
      courseid: { $in: student.courseIds }
    });

    // Map fields to match frontend expectations
    const formattedCourses = enrolledCourses.map(course => ({
      id: course.courseid,
      title: course.coursename,
      description: course.description,
      mentor: course.mentorname,
      endDate: course.enrollmentend ? new Date(course.enrollmentend).toISOString().split("T")[0] : null,
      tags: course.prerequisites || []
    }));

    res.json(formattedCourses);
  } catch (err) {
    console.error("Error fetching enrolled courses:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//Get recommended courses

router.get("/recommended-courses/:studentid", async (req, res) => {
  try {
    const { studentid } = req.params;

    // Match string with string
    const enrollments = await Enrollment.find({ studentid: String(studentid), isenrolled: true });

    // Convert courseid (from string to number) for comparison
    const enrolledCourseIds = enrollments.map(e => parseInt(e.courseid));

    // Get all courses not enrolled
    const recommendedCourses = await Course.find({
      courseid: { $nin: enrolledCourseIds }
    });

    const formatted = recommendedCourses.map(course => ({
      id: course.courseid,
      title: course.coursename,
      description: course.description,
      mentor: course.mentorname,
      endDate: course.enrollmentend ? new Date(course.enrollmentend).toISOString().split("T")[0] : null,
      tags: course.prerequisites || []
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching recommended courses:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
