const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const Mentor = require("../models/Mentor");

// ---------- SIGNUP ----------
router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const userExists = await (role === "student"
      ? Student.findOne({ email })
      : Mentor.findOne({ email }));

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    let newUser;
    if (role === "student") {
      newUser = new Student({ username, email, password });
    } else {
      newUser = new Mentor({ username, email, password });
    }

    await newUser.save(); // triggers pre-save middleware

    return res.status(201).json({
      message: "User created successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        role,
        ...(role === "student" && { studentid: newUser.studentid }),
        ...(role === "mentor" && { mentorid: newUser.mentorid }),
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: err.message });
  }
});

// ---------- LOGIN ----------
router.post("/login", async (req, res) => {
  const { identifier, password, role } = req.body;

  try {
    const user = await (role === "student"
      ? Student.findOne({ $or: [{ username: identifier }, { email: identifier }] })
      : Mentor.findOne({ $or: [{ username: identifier }, { email: identifier }] }));

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        role,
        ...(role === "student" && { studentid: user.studentid }),
        ...(role === "mentor" && { mentorid: user.mentorid }),
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
