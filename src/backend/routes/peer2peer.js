
const express = require("express");
const router = express.Router();
const peers=require("../models/peer2peer")
const Student = require("../models/Student");
const Course = require("../models/course");
const Problem=require("../models/Problem");

// GET /courses/student/:id
router.get("/courses/student/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    
    const student = await Student.findOne({ studentid: req.params.id });
    if (!student) return res.status(404).json({ error: "Student not found" });

    const courseNames = student.enrolledCourses; // just use it directly
    res.json(courseNames);
    // console.log(courseNames);
  } catch (err) {
    console.error("Error fetching student courses:", err);
    res.status(500).json({ error: "Server error" });
  }
});



// POST /challenge
router.post("/challenge", async (req, res) => {
  try {
    const { challengerId, opponentId, course, datetime } = req.body;

    const newChallenge = new peers({
      challengerId,
      opponentId,
      course,
      datetime
    });
    console.log(datetime);
    await newChallenge.save();
    res.status(201).json({ message: "Challenge created", challenge: newChallenge });
  } catch (err) {
    console.error("Error creating challenge:", err);
    res.status(500).json({ error: "Server error" });
  }
});



// GET /history/:studentId
router.get("/history/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const challenges = await peers.find({
      $or: [
        { challengerId: Number(studentId) },
        { opponentId: Number(studentId) }
      ]
    }).sort({ datetime: -1 });

    // 🔁 Format response for frontend
    const formatted = challenges.map((c) => ({
      name: "Peer2Peer",
      date: new Date(c.datetime).toISOString().split("T")[0], // "YYYY-MM-DD"
      course: c.course,
      status: c.status || "Pending"
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ error: "Server error" });
  }
});




// PUT /challenge/:id/status
router.put("/challenge/:id/status", async (req, res) => {
  try {
    const { status, result } = req.body;
    const updated = await peers.findOneAndUpdate(
      { challengeId: req.params.id },
      { status, result },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Challenge not found" });

    res.json(updated);
  } catch (err) {
    console.error("Error updating challenge:", err);
    res.status(500).json({ error: "Server error" });
  }
});

//Get route
router.get("/peers/:courseName/:studentid", async (req, res) => {
  const { courseName, studentid } = req.params;

  try {
    // 1. Get course from name
    const course = await Course.findOne({ coursename: courseName });
    if (!course) return res.status(404).json({ error: "Course not found" });

    // 2. Get current student
    const currentStudent = await Student.findOne({ studentid });
    if (!currentStudent) return res.status(404).json({ error: "Student not found" });

    // 3. Find peers
    const peers = await Student.find({
      studentid: { $ne: studentid },
      level: currentStudent.level,
      enrolledCourses: course.coursename, // ✅ match by name, not _id
    }).select("studentid username points enrolledCourses");

    // 4. Format for frontend
    const peerData = peers.map((peer) => ({
      id: peer.studentid,
      name: peer.username,
      points: peer.points,
      contests: Math.floor(Math.random() * 10), // optional
      course: courseName
    }));

    res.json(peerData);
  } catch (err) {
    console.error("Error fetching peer matches:", err);
    res.status(500).json({ error: "Server error" });
    console.error("Error fetching peers:", err);
    res.status(500).json({ error: "Server error" });
  }
});
//p2p Matches
// GET /p2p-matches/:studentid
router.get("/p2p-matches/:studentid", async (req, res) => {
  try {
    const { studentid } = req.params;

    // Step 1: Get only matches where student is involved
    const matches = await peers.find({
      $or: [
        { challengerId: studentid },
        { opponentId: studentid }
      ]
    }).sort({ datetime: -1 });

    if (matches.length === 0) {
      return res.status(200).json([]); // No matches for this student
    }

    // Step 2: Get involved student IDs
    const studentIds = Array.from(
      new Set(matches.flatMap(m => [m.challengerId, m.opponentId]))
    );

    const students = await Student.find({ studentid: { $in: studentIds } });

    const studentMap = {};
    const studentLevelMap = {};
    students.forEach(s => {
      studentMap[s.studentid] = s.username;
      studentLevelMap[s.studentid] = s.level;
    });

    const levelMap = {
      Beginner: "Easy",
      Intermediate: "Medium",
      Advanced: "Hard"
    };

    // Fetch problems once
    const allProblems = await Problem.find({});
    const problemsByLevel = {
      Easy: allProblems.filter(p => p.level === "Easy"),
      Medium: allProblems.filter(p => p.level === "Medium"),
      Hard: allProblems.filter(p => p.level === "Hard")
    };

    const formattedMatches = matches.map(match => {
      const date = new Date(match.datetime);
      const matchDate = date.toISOString().split("T")[0];
      const contestTime = date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
      });

      const challengerLevel = studentLevelMap[match.challengerId] || "Beginner";
      const problemLevel = levelMap[challengerLevel] || "Easy";
      const problemPool = problemsByLevel[problemLevel] || [];
      const randomProblem = problemPool[Math.floor(Math.random() * problemPool.length)];

      return {
        id: `p2p-${match.challengeId}`,
        student1: studentMap[match.challengerId] || "Unknown",
        student2: studentMap[match.opponentId] || "Unknown",
        course: match.course,
        level: challengerLevel,
        contestTime,
        matchDate,
        tags: ["Peer Match"],
        problemid: randomProblem?.problemId || null
      };
    });

    res.status(200).json(formattedMatches);
  } catch (err) {
    console.error("Error fetching peer matches:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;