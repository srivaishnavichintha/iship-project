const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const problemRoutes = require("./routes/mentor/problems")

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/mentor/problems",problemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});