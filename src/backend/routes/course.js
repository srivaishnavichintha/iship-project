const express = require("express");
const router = express.Router();
const Course = require("../models/course");

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




module.exports = router;
