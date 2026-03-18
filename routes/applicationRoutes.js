const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer(); // memory storage

const { applyJob, getApplications } = require("../controllers/applicationController");

router.post("/", upload.single("resume"), applyJob);
router.get("/", getApplications);

module.exports = router;