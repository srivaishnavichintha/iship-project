const express = require("express");
const router = express.Router();
const Contest = require("../../models/contest");

// POST route to create a new contest
router.post("/mentor/contests", async (req, res) => {
  try {
    const {
      contesttitle,
      contestdate,
      conteststatus,
      contestdifficulty,
      contestdescription,
      mentorid,
      mentorname
    } = req.body;

    // Validation (optional)
    if (
  contesttitle == null ||
  contestdate == null ||
  conteststatus == null ||
  contestdifficulty == null ||
  contestdescription == null ||
  mentorid == null ||
  mentorname == null
) {
  return res.status(400).json({ error: "All fields are required" });
}


    const newContest = new Contest({
      contesttitle,
      contestdate,
      conteststatus: conteststatus.toLowerCase(),         // convert to match enum
      contestdifficulty: contestdifficulty.toLowerCase(), // convert to match enum
      contestdescription,
      mentorid,
      mentorname
    });

    await newContest.save();
    res.status(201).json({ message: "Contest created successfully", contest: newContest });
  } catch (err) {
    console.error("Error creating contest:", err);
    res.status(500).json({ error: "Server error while creating contest" });
  }
});

// GET route to fetch all contests
router.get("/contests", async (req, res) => {
  try {
    const contests = await Contest.find().sort({ contestdate: 1 });
    res.json(contests);
  } catch (err) {
    console.error("Error fetching contests:", err);
    res.status(500).json({ error: "Server error while fetching contests" });
  }
});

module.exports = router;
