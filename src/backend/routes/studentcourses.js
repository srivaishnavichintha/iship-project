// const express = require("express");
// const router = express.Router();
// const Student = require("../models/Student");
// const Course = require("../models/course");

// // GET /student/:studentid/enrolled-courses
// router.get("/student/:studentid/enrolled-courses", async (req, res) => {
//   try {
//     const studentid = parseInt(req.params.studentid);
//     console.log("Fetching enrolled courses for studentid:", studentid);

//     const student = await Student.findOne({ studentid });
//     if (!student) {
//       console.log("Student not found");
//       return res.status(404).json({ error: "Student not found" });
//     }

//     console.log("Student found:", student);

//     if (!Array.isArray(student.courseIds)) {
//       console.log("courseIds is not an array:", student.courseIds);
//       return res.status(400).json({ error: "Invalid courseIds" });
//     }

//     const enrolledCourses = await Course.find({
//       courseid: { $in: student.courseIds },
//     });

//     console.log("Enrolled Courses:", enrolledCourses);
//     res.json(enrolledCourses);
//   } catch (err) {
//     console.error("🔥 Error in enrolled-courses:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });


// // GET /student/:studentid/recommended-courses
// router.get("/student/:studentid/recommended-courses", async (req, res) => {
//   try {
//     const studentid = parseInt(req.params.studentid);
//     const student = await Student.findOne({ studentid });

//     if (!student) return res.status(404).json({ error: "Student not found" });

//     // Recommend courses not yet enrolled and matching student's level
//     const recommendedCourses = await Course.find({
//       courseid: { $nin: student.courseIds },
//       level: student.level  // Optional: recommend only same-level courses
//     });

//     res.json(recommendedCourses);
//   } catch (err) {
//     console.error("Error fetching recommended courses:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;
