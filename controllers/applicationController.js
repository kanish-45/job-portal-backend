const Application = require("../models/Application");
const { Upload } = require("@aws-sdk/lib-storage");
const s3 = require("../config/s3");

const { SendEmailCommand } = require("@aws-sdk/client-ses");
const ses = require("../config/ses");

// APPLY JOB WITH RESUME + EMAIL
exports.applyJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    let resumeUrl = null;

    // 🔥 Upload resume to S3
    if (req.file) {
      const upload = new Upload({
        client: s3,
        params: {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: `resumes/${Date.now()}-${req.file.originalname}`,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        },
      });

      const result = await upload.done();
      resumeUrl = result.Location;
    }

    // 🔥 Save application in DB
    const application = await Application.create({
      userId,
      jobId,
      resumeUrl,
      status: "Pending",
    });

    // 🔥 Send Email via SES
    const emailParams = {
      Source: process.env.AWS_EMAIL, // must be verified in SES
      Destination: {
        ToAddresses: [process.env.AWS_EMAIL],
      },
      Message: {
        Subject: {
          Data: "New Job Application 🚀",
        },
        Body: {
          Text: {
            Data: `
New Application Received!

User ID: ${userId}
Job ID: ${jobId}

Resume Link:
${resumeUrl || "No resume uploaded"}
            `,
          },
        },
      },
    };

    await ses.send(new SendEmailCommand(emailParams));

    // 🔥 Final Response
    res.status(201).json({
      message: "Applied with resume & email sent ✅",
      application,
    });

  } catch (error) {
    console.error("Application Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// GET ALL APPLICATIONS
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.findAll();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};