const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/course");
const problemRoutes = require("./routes/mentor/problems");
const contestRoutes = require("./routes/mentor/contests");
const mentorcourseRoutes=require("./routes/mentor/course")
const enrollmentRoutes = require("./routes/enrollment");
const peer2peerRoutes = require("./routes/peer2peer");
const practiceRoutes = require("./routes/compiler");
const submissionRoutes = require("./routes/submission");
const studentRoutes = require("./routes/student");
// const studentCourseRoutes = require("./routes/studentcourses");
// const playgroundRoutes = require('./routes/playground');


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());



app.use("/", authRoutes);
app.use("/", courseRoutes);
app.use("/mentor/problems",problemRoutes);
app.use("/",mentorcourseRoutes);
app.use("/", contestRoutes);
app.use("/",enrollmentRoutes);
app.use("/mentor", mentorcourseRoutes); // instead of using "/"
app.use("/",peer2peerRoutes);
app.use("/", practiceRoutes);
app.use("/submissions", submissionRoutes);
app.use("/", studentRoutes);
// app.use("/", studentCourseRoutes);
// app.use('/p2p-matches', playgroundRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});