import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Or your preferred provider
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use an "App Password" for Gmail
    },
  });

  const mailOptions = {
    from: '"Luntra App" <noreply@luntra.com>',
    to: email,
    subject: "Your Verification Code",
    html: `<h1>Welcome to Luntra!</h1>
           <p>Your verification code is: <strong>${otp}</strong></p>
           <p>This code expires in 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};