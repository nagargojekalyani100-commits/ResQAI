const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify SMTP connection
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Transport Error:", error);
  } else {
    console.log("✅ SMTP Server is ready");
  }
});

const sendEmergencyEmail = async (report, aiAnalysis) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,

    // Receiver email
    to: "nagargojekalyani100@gmail.com",

    subject: `🚨 Disaster Alert - ${report.disasterType}`,

    html: `
      <h2>🚨 New Disaster Report</h2>

      <p><b>Disaster Type:</b> ${report.disasterType}</p>

      <p><b>Location:</b> ${report.location}</p>

      <p><b>Description:</b> ${report.description}</p>

      <p><b>People Affected:</b> ${report.peopleAffected}</p>

      <hr>

      <h3>🤖 AI Analysis</h3>

      <p><b>Risk Level:</b> ${aiAnalysis.riskLevel}</p>

      <p><b>Risk Score:</b> ${aiAnalysis.riskScore}</p>

      <p><b>Summary:</b> ${aiAnalysis.summary}</p>

      <p><b>Emergency Message:</b></p>

      <p>${aiAnalysis.emergencyMessage}</p>

      <h3>Recommended Actions</h3>

      <ul>
        ${aiAnalysis.actions
          .map((action) => `<li>${action}</li>`)
          .join("")}
      </ul>
    `,
  };

  try {
    console.log("📧 Sending email to:", mailOptions.to);

    const info = await transporter.sendMail(mailOptions);

    console.log("=========== EMAIL INFO ===========");
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Envelope:", info.envelope);
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
    console.log("=================================");
  } catch (err) {
    console.error("❌ Email Error:", err);
    throw err;
  }
};

module.exports = sendEmergencyEmail;