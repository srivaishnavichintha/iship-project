const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
const problemRoutes = require("./routes/mentor/problems");
const enrollmentRoutes = require("./routes/enrollment");
const contestRoutes = require("./routes/mentor/contests");


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/", courseRoutes);
app.use("/mentor/problems",problemRoutes);
app.use("/",enrollmentRoutes);
app.use("/", contestRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});