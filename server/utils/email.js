import nodemailer from 'nodemailer';

export class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `Luxury Haven <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid or other production service
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    // Mailtrap for development
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(subject, text) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendOTP(otp) {
    await this.send('Your OTP', `Your OTP is ${otp}`);
  }
}

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Luxury Haven <hello@luxuryhaven.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;