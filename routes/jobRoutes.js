const express = require("express");
const router = express.Router();

const { createJob, getJobs } = require("../controllers/jobController");

// 🔥 ADD THIS DEBUG ROUTE
router.get("/test", (req, res) => {
  res.send("Job route working ✅");
});

router.post("/", createJob);
router.get("/", getJobs);

module.exports = router;
