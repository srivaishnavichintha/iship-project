import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  company: String,
  problemId: Number,
  title: String,
  difficulty: String,
  successRate: String
});

export default mongoose.model("Problem", problemSchema);
