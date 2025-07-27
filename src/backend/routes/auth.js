const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const Mentor=require("../models/Mentor");

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password,role } = req.body;
  try {
    const userExists = await Student.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });
    if(role=="student"){
      const newUser = new Student({ username, email, password });
      await newUser.save();
    }
    else{
      const newUser = new Mentor({ username, email, password });
      await newUser.save(); 
    }
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username,email, password,role } = req.body;
  try {
    if(role=="student"){
      const usermail = await Student.findOne({ email });
      const user= await Student.findOne({username});
      if (!user&&!usermail) return res.status(400).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      res.status(200).json({ message: "Login successful" });
    }
    else{
       const usermail = await Mentor.findOne({ email });
      const user= await Mentor.findOne({username});
      if (!user&&!usermail) return res.status(400).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      res.status(200).json({ message: "Login successful" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;