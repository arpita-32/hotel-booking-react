const SibApiV3Sdk = require("@getbrevo/brevo");

const mailSender = async (email, title, body) => {
  try {
    console.log("📨 Using Brevo API");

    const client = new SibApiV3Sdk.TransactionalEmailsApi();
    client.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.MAIL_PASS
    );

    const sendSmtpEmail = {
      sender: { email: process.env.MAIL_USER },
      to: [{ email }],
      subject: title,
      htmlContent: body,
    };

    const response = await client.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent!");
    return response;

  } catch (err) {
    console.error("❌ Brevo API Error:", err.message);
    throw new Error("Failed to send email");
  }
};

module.exports = mailSender;
