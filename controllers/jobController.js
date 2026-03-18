const Job = require("../models/Job");

// CREATE JOB (Employer)
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json({
      message: "Job created successfully ✅",
      job
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL JOBS
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();

    res.json(jobs);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};