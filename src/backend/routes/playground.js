// routes/peer2peer.js
const express = require('express');
const router = express.Router();
const playground = require('../models/Playground');

// GET all peer matches
router.get('/', async (req, res) => {
  try {
    const matches = await playground.find();
    res.json(matches);
  } catch (err) {
    console.error('Error fetching peer2peer matches:', err);
    res.status(500).json({ error: 'Failed to fetch peer matches' });
  }
});

module.exports = router;
