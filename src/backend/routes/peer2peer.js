// // const express = require("express");
// // const router = express.Router();
// // const Enrollment = require("../models/Enrollment");
// // const PeerChallenge = require("../models/peer2peer");
// // // GET enrolled courses for a student
// // router.get("/courses/student/:studentid", async (req, res) => {
// //   const { studentid } = req.params;

// //   try {
// //     // Get all enrollments where isenrolled is true
// //     const enrollments = await Enrollment.find({ studentid, isenrolled: true });

// //     // Extract unique course names
// //     const courseNames = enrollments.map(e => e.coursename);

// //     res.status(200).json(courseNames);
// //   } catch (error) {
// //     console.error("Error fetching enrolled courses:", error);
// //     res.status(500).json({ error: "Failed to fetch courses" });
// //   }
// // });

// // router.get("/history/:studentid", async (req, res) => {
// //   const { studentid } = req.params;

// //   try {
// //     const history = await PeerChallenge.find({
// //       $or: [{ challengerId: studentid }, { opponentId: studentid }]
// //     });

// //     // Optional formatting for frontend display
// //     const formatted = history.map((item) => ({
// //       name: `Challenge vs ${item.challengerId === studentid ? 'Opponent' : 'Challenger'}`,
// //       date: item.datetime,
// //       course: item.course,
// //       status: item.status
// //     }));

// //     res.status(200).json(formatted);
// //   } catch (err) {
// //     console.error("Error fetching history:", err);
// //     res.status(500).json({ error: "Failed to fetch history" });
// //   }
// // });

// // router.get("/peers/:course/:studentid", async (req, res) => {
// //   const { course, studentid } = req.params;

// //   try {
// //     const enrollments = await Enrollment.find({ coursename: course, isenrolled: true });

// //     const peers = enrollments
// //       .filter(e => e.studentid !== studentid)
// //       .map(e => ({
// //         id: e.studentid,
// //         name: `Student ${e.studentid.slice(-4)}`, // Replace with actual student name if available
// //         points: Math.floor(Math.random() * 1000), // Replace with real logic
// //         contests: Math.floor(Math.random() * 10),
// //         course: e.coursename
// //       }));

// //     res.status(200).json(peers);
// //   } catch (err) {
// //     console.error("Error fetching peers:", err);
// //     res.status(500).json({ error: "Failed to fetch peers" });
// //   }
// // });

// // router.post("/challenge", async (req, res) => {
// //   const { challengerId, opponentId, course, datetime } = req.body;

// //   try {
// //     const newChallenge = new PeerChallenge({
// //       challengerId,
// //       opponentId,
// //       course,
// //       datetime,
// //       status: "Pending"
// //     });

// //     await newChallenge.save();
// //     res.status(201).json({ message: "Challenge created successfully" });
// //   } catch (err) {
// //     console.error("Error creating challenge:", err);
// //     res.status(500).json({ error: "Failed to create challenge" });
// //   }
// // });

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const Peer = require("../models/peer2peer");
// const Student =require("../models/Student");
// const Course=require("../models/course")
// // ✅ Get all enrolled courses of a student
// router.get("/courses/student/:id", async (req, res) => {
//   try {
//     const peer = await Peer.findOne({ studentId: req.params.id });
//     if (peer) return res.json(peer.courses);
//     res.status(404).json([]);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch courses" });
//   }
// });

// // ✅ Get contest history for a student
// router.get("/history/:id", async (req, res) => {
//   try {
//     const peer = await Peer.findOne({ studentId: req.params.id });
//     if (!peer) return res.status(404).json([]);
//     res.json(peer.contests);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch history" });
//   }
// });

// // ✅ Get all peers from same course except the logged-in student

// // GET /peers/:courseName/:studentid
// router.get("/peers/:courseName/:studentid", async (req, res) => {
//    console.log("🔁 [GET] /peers/:courseName/:studentid hit");  
//   const { courseName, studentid } = req.params;

// // const currentStudent = await Student.findOne({ studentid: studentidNum });


//   try {
//     // 1. Get course _id from courseName
//     const course = await Course.findOne({ coursename: courseName });
//     if (!course) return res.status(404).json({ error: "Course not found" });

//     // 2. Get the requesting student
//     const currentStudent = await Student.findOne({ studentid: studentid });
//     if (!currentStudent) return res.status(404).json({ error: "Student not found" });

//     // 3. Find other students who are:
//     //    - Same level
//     //    - Enrolled in this course
//     //    - Not the current student
//     const peers = await Student.find({
//       studentid: { $ne: studentid }, // exclude self
//       level: currentStudent.level,   // same level
//       enrolledCourses: course._id,   // enrolled in this course
//     }).select("studentid username points enrolledCourses");

//     // 4. Format response for frontend
//     const peerData = peers.map((peer) => ({
//       id: peer.studentid,
//       name: peer.username,
//       points: peer.points,
//       // contests: Math.floor(Math.random() * 10), // You can fetch actual count if needed
//       course: courseName
//     }));

//     res.json(peerData);
//     console.log("peerdata=",peerData);
//   } catch (err) {
//     console.error("Error fetching peers:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });



// // ✅ Send a peer-to-peer challenge (added to both users)
// router.post("/challenge", async (req, res) => {
//   const { challengerId, opponentId, course, datetime } = req.body;

//   try {
//     const challenger = await Peer.findOne({ studentId: challengerId });
//     const opponent = await Peer.findOne({ studentId: opponentId });

//     if (!challenger || !opponent)
//       return res.status(400).json({ error: "Invalid users" });

//     const challengeEntryForChallenger = {
//       opponentId,
//       course,
//       datetime,
//       status: "Pending"
//     };

//     const challengeEntryForOpponent = {
//       opponentId: challengerId,
//       course,
//       datetime,
//       status: "Pending"
//     };

//     await Peer.updateOne(
//       { studentId: challengerId },
//       { $push: { challenges: challengeEntryForChallenger } }
//     );

//     await Peer.updateOne(
//       { studentId: opponentId },
//       { $push: { challenges: challengeEntryForOpponent } }
//     );

//     res.status(200).json({ message: "Challenge sent" });
//   } catch (err) {
//     console.error("Challenge error:", err);
//     res.status(500).json({ error: "Failed to send challenge" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const peers=require("../models/peer2peer")
const Student = require("../models/Student");
const Course = require("../models/course");

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
      name: `Peer2Peer`,
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
// router.put("/challenge/:id/status", async (req, res) => {
//   try {
//     const { status, result } = req.body;
//     const updated = await peers.findOneAndUpdate(
//       { challengeId: req.params.id },
//       { status, result },
//       { new: true }
//     );

//     if (!updated) return res.status(404).json({ error: "Challenge not found" });

//     res.json(updated);
//   } catch (err) {
//     console.error("Error updating challenge:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

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
    console.error("Error fetching peers:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/p2p-matches", async (req, res) => {
  try {
    // Step 1: Get all peer challenges
    const matches = await peers.find().sort({ datetime: -1 });

    // Step 2: Extract unique student IDs involved in challenges
    const studentIds = Array.from(
      new Set(matches.flatMap(m => [m.challengerId, m.opponentId]))
    );

    // Step 3: Fetch those students to get their usernames
    const students = await Student.find({ studentid: { $in: studentIds } });

    // Step 4: Create a mapping from studentid to username
    const studentMap = {};
    students.forEach(s => {
      studentMap[s.studentid] = s.username;
    });

    // Step 5: Format response for frontend
    const formattedMatches = matches.map(match => {
      const date = new Date(match.datetime);
      const matchDate = date.toISOString().split("T")[0];
      const contestTime = date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
      });

      return {
        id: `p2p-${match.challengeId}`,
        student1: studentMap[match.challengerId] || "Unknown",
        student2: studentMap[match.opponentId] || "Unknown",
        course: match.course,
        level: "Intermediate", // or dynamic if needed
        contestTime,
        matchDate,
        tags: ["Peer Match"]
      };
    });

    res.status(200).json(formattedMatches);
  } catch (err) {
    console.error("Error fetching peer matches:", err);
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;