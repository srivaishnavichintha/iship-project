const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const mentorRoutes = require("./routes/course");
const problemRoutes = require("./routes/mentor/problems");
const enrollmentRoutes = require("./routes/Enrollment");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/", mentorRoutes);
app.use("/mentor/problems",problemRoutes);
app.use("./enroll",enrollmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});