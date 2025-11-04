const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    console.log("🔧 ============ MAIL SENDER START ============");
    console.log("📧 Recipient:", email);
    console.log("📝 Subject:", title);
    console.log("🔑 Using email:", process.env.MAIL_USER);
    console.log("🏠 SMTP Host:", process.env.MAIL_HOST);
    console.log("🚪 SMTP Port:", process.env.MAIL_PORT);

    // Validate environment variables
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
      throw new Error("Missing email environment variables");
    }

    // Create transporter with explicit settings
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      connectionTimeout: 30000, // 30 seconds
      greetingTimeout: 30000,
      socketTimeout: 30000,
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
        ciphers: 'SSLv3'
      },
      debug: true, // Enable debug output
      logger: true // Enable logger
    });

    console.log("🔄 Verifying SMTP connection...");

    // Verify connection configuration
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully");

    console.log("📤 Sending email...");
    
    // Send mail
    let info = await transporter.sendMail({
      from: `"B.S.H RESIDENCY" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("✅ Email sent successfully!");
    console.log("📨 Message ID:", info.messageId);
    console.log("✅ Response:", info.response || "No response field");
    console.log("============ MAIL SENDER END ============");

    return info;

  } catch (error) {
    console.error("❌ ============ MAIL SENDER ERROR ============");
    console.error("📧 Failed to send to:", email);
    console.error("🔧 Error name:", error.name);
    console.error("🔧 Error code:", error.code);
    console.error("🔧 Error message:", error.message);
    
    if (error.response) {
      console.error("📨 SMTP Response:", error.response);
    }
    
    if (error.command) {
      console.error("🔧 SMTP Command:", error.command);
    }

    // Enhanced error messages
    let userMessage = "Failed to send email";
    
    if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      userMessage = "Cannot connect to email server. Please check your internet connection and try again.";
    } else if (error.code === 'EAUTH') {
      userMessage = "Email authentication failed. Please check your email credentials in the environment variables.";
    } else if (error.code === 'EENVELOPE') {
      userMessage = "Invalid email address. Please check the recipient email.";
    } else if (error.responseCode) {
      userMessage = `Email server responded with error: ${error.responseCode}`;
    }

    console.error("❌ ============ MAIL SENDER ERROR END ============");
    
    throw new Error(userMessage);
  }
};

module.exports = mailSender;