const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import DB connection
const sequelize = require("./config/db");

// Import Models
const User = require("./models/User");
const Job = require("./models/Job");
const Application = require("./models/Application");

// Create app FIRST
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Job Portal API is Running 🚀");
});

// 🔥 Connect DB + Sync Tables
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully ✅");

    await sequelize.sync({ alter: true });
    console.log("Tables created successfully ✅");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Startup error ❌", error);
  }
};

startServer();