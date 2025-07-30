require("dotenv").config();
const mongoose = require("mongoose");
const Counter = require("./models/counter"); // Adjust the path if needed

 mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once("open", async () => {
  try {
    const counters = ["studentid", "mentorid", "problemid", "courseid"];

    for (const id of counters) {
      const existing = await Counter.findOne({ id });
      if (!existing) {
        await Counter.create({ id, seq: 0 });
        console.log(`✅ Initialized counter: ${id}`);
      } else {
        console.log(`ℹ️ Counter '${id}' already exists with seq: ${existing.seq}`);
      }
    }
  } catch (err) {
    console.error("❌ Error initializing counters:", err.message);
  } finally {
    mongoose.connection.close();
  }
});
