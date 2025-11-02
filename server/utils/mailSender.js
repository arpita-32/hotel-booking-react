const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // ✅ Create transporter with explicit port and secure flag
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,              // Common for Gmail, Outlook, etc.
      secure: true,           // Use SSL
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // ✅ Define the email details
    const info = await transporter.sendMail({
      from: `"B.S.H RESIDENCY" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Email sent successfully:", info.messageId || info.response || info.envelope);
    return info;
  } catch (error) {
    console.error("❌ Error while sending email:");
    console.error("Message:", error.message);
    if (error.response) console.error("Response:", error.response);
    if (error.code) console.error("Code:", error.code);
    throw error; // Re-throw to let the caller (OTP.js) handle it
  }
};

module.exports = mailSender;
