import nodemailer from "nodemailer";

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTPEmail(email: string, otp: string): Promise<void> {
  // Configure nodemailer with your email service
  const transporter = nodemailer.createTransport({
    service: "gmail", // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email - Open Treatment",
    html: `
      <div>
        <h2>Email Verification</h2>
        <p>Your OTP for verification is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 15 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
