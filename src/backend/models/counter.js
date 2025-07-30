const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

// ✅ Export the model safely
module.exports = mongoose.models.Counter || mongoose.model("Counter", counterSchema);