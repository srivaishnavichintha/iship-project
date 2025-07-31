    const mongoose = require("mongoose");
    const Counter = require("./counter");

    const enrollmentSchema = new mongoose.Schema({
  enrollmentid: {
    type: Number,
    unique: true,
  },
  courseid: {
    type: String,
    required: true,
    trim: true
  },
  coursename: {
    type: String,
    required: true,
    trim: true
  },
  studentid: {
    type: String,
    required: true,
    trim: true
  },
  enrollmentend: {
    type: Date, // Use Date type
    required: true
  },
  isenrolled: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });


    // Auto-increment logic for problemId
   enrollmentSchema.pre("save", async function (next) {
  if (this.isNew) {
    console.log("⏳ Running pre-save hook to set enrollmentid"); // 👈 MUST SEE THIS

    const counter = await Counter.findOneAndUpdate(
      { id: "enrollmentid" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    if (!counter) {
      return next(new Error("Failed to get counter"));
    }

    this.enrollmentid = counter.seq;
  }
  next();
});


module.exports = mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);
