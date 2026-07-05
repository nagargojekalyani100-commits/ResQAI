const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log("❌ Transport Error:", error);
  } else {
    console.log("✅ SMTP Server is ready");
  }
});

const sendEmergencyEmail = async (report, aiAnalysis) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,

    // Change this to the email that should receive alerts.
    to: process.env.EMAIL_USER,

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
  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent:", info.response);
} catch (err) {
  console.error("❌ Email Error:", err);
}
};

module.exports = sendEmergencyEmail;