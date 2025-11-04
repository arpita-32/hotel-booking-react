const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // auto-delete after 5 minutes
  },
});

// ---- Helper: Send Verification Email ----
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email",
      emailTemplate(otp)
    );

    // Log safely — only if property exists
    console.log(
      "✅ Email sent successfully:",
      mailResponse?.response || mailResponse?.message || "Mail sent (no response field)"
    );
  } catch (error) {
    console.error("❌ Error occurred while sending email:", error.message || error);
    if (error.response) {
      console.error("Mail server response:", error.response);
    }

    // Don’t crash the app — just continue
    return null;
  }
}

// ---- Schema Middleware: Pre-save ----
OTPSchema.pre("save", async function (next) {
  console.log("🆕 New document saved to database");

  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }

  next();
});

const OTP = mongoose.model("OTP", OTPSchema);
module.exports = OTP;