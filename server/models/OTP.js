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
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

// Define a post-save hook to send email after the document has been saved
OTPSchema.post("save", async function (doc) {
  console.log("🆕 New OTP saved to database:", {
    email: doc.email,
    otp: doc.otp,
    id: doc._id
  });

  // Send the email
  try {
    console.log(`📧 Attempting to send email to: ${doc.email}`);
    const mailResponse = await mailSender(
      doc.email,
      "B.S.H RESIDENCY - Verification Code",
      emailTemplate(doc.otp)
    );
    
    console.log(`✅ Email sent successfully to: ${doc.email}`);
    console.log(`📨 Message ID: ${mailResponse.messageId}`);
  } catch (error) {
    console.error(`❌ Failed to send verification email:`);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Email:", doc.email);
    
    // Don't throw the error - we don't want to break the OTP saving process
  }
});

module.exports = mongoose.model("OTP", OTPSchema);