const mongoose = require("mongoose");
const Counter =require("./counter");
const challengeSchema = new mongoose.Schema({
    challengeId:{
        type:Number
    },
  challengerId: {
    type: Number,
    ref: "Student",
    required: true
  },
  opponentId: {
    type: Number,
    ref: "Student",
    required: true
  },
  course: {
    type: String, // Or course ID if you prefer relation
    required: true
  },
  datetime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected", "Completed", "Won", "Lost"],
    default: "Pending"
  },
  result: {
    type: String, // e.g., "challenger", "opponent", "draw"
    enum: ["challenger", "opponent", "draw", null],
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

challengeSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "challengeId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.challengeId = counter.seq;
  }
  next();
});

module.exports = mongoose.model("PeerChallenge", challengeSchema);
