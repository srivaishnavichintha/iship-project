const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const Mentor = require("../models/Mentor");

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists =
      role === "student"
        ? await Student.findOne({ email })
        : await Mentor.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    let newUser;
    if (role === "student") {
      newUser = new Student({ username, email, password });
    } else {
      newUser = new Mentor({ username, email, password });
    }

    await newUser.save(); // pre("save") hook will hash password here

    res.status(201).json({
      message: "User created successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        role,
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Login Route
router.post("/login", async (req, res) => {
  const { identifier, password, role } = req.body;

  console.log("Login attempt:", { identifier, password, role });

  try {
    let user;
    if (role === "student") {
      user = await Student.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });
    } else {
      user = await Mentor.findOne({
        $or: [{ username: identifier }, { email: identifier }],
      });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

   res.status(200).json({
  message: "Login successful",
  user: {
    studentid: user.studentid, // ⬅️ include this
    username: user.username,
    email: user.email,
    role,
  },
})


  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;

