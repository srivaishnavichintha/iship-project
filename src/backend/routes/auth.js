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

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (role === "student") {
      newUser = new Student({ username, email, password: hashedPassword });
    } else {
      newUser = new Mentor({ username, email, password: hashedPassword });
    }

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        role: role 
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    let user;
    if (role === "student") {
      user = await Student.findOne({ username }) || await Student.findOne({ email });
    } else {
      user = await Mentor.findOne({ username }) || await Mentor.findOne({ email });
    }

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        role: role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
