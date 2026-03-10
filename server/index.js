require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
app.use(
  cors({
    origin: process.env.BASE_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
  }),
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/ideas", require("./routes/ideaRoutes"));

app.listen(port, () => console.log(`Server running on :${port}`));
