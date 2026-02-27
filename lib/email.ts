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
    from: `"Open Treatment" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "🔐 Verify Your Email - Open Treatment",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div style="max-width: 600px; margin: 20px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
          
          <!-- Header with Logo -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
            <div style="margin-bottom: 20px;">
              <!-- Logo - Replace with your actual logo URL -->
              <img src="/public/Subtract.svg" 
                   alt="Open Treatment Logo" 
                   style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid white; box-shadow: 0 5px 15px rgba(0,0,0,0.3);"
                   onerror="this.style.display='none'">
            </div>
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">Open Treatment</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Your Health, Our Priority</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px; background: #f8f9fa;">
            <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
              <h2 style="color: #333; margin: 0 0 10px; font-size: 24px; text-align: center;">Email Verification</h2>
              <p style="color: #666; margin: 0 0 30px; text-align: center; font-size: 16px;">Please verify your email address to continue</p>
              
              <!-- OTP Box -->
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px; padding: 30px; text-align: center; margin: 20px 0;">
                <p style="color: white; margin: 0 0 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Your Verification Code</p>
                <div style="background: rgba(255,255,255,0.2); border-radius: 10px; padding: 15px; display: inline-block;">
                  <span style="font-size: 48px; font-weight: 800; color: white; letter-spacing: 8px; font-family: 'Courier New', monospace;">${otp}</span>
                </div>
              </div>
              
              <!-- Timer Info -->
              <div style="text-align: center; margin: 20px 0;">
                <div style="display: inline-block; background: #f0f0f0; border-radius: 50px; padding: 8px 20px;">
                  <span style="color: #666; font-size: 14px;">⏰ Valid for 15 minutes</span>
                </div>
              </div>
              
              <!-- Instructions -->
              <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; margin: 20px 0;">
                <p style="color: #333; margin: 0 0 10px; font-weight: 600;">📋 How to verify:</p>
                <p style="color: #666; margin: 5px 0;">1. Enter this code in the verification field</p>
                <p style="color: #666; margin: 5px 0;">2. Click on "Verify Email" button</p>
                <p style="color: #666; margin: 5px 0;">3. Start your healthcare journey with us!</p>
              </div>
              
              <!-- Security Note -->
              <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; margin-top: 20px;">
                <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
                  🔒 Never share this OTP with anyone. Our team will never ask for your password or OTP.
                </p>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #333; padding: 30px; text-align: center;">
            <div style="margin-bottom: 20px;">
              <!-- Social Media Icons (optional) -->
              <a href="#" style="display: inline-block; margin: 0 10px;">
                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" style="width: 24px; height: 24px;">
              </a>
              <a href="#" style="display: inline-block; margin: 0 10px;">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" style="width: 24px; height: 24px;">
              </a>
              <a href="#" style="display: inline-block; margin: 0 10px;">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" style="width: 24px; height: 24px;">
              </a>
            </div>
            <p style="color: #999; margin: 0 0 10px; font-size: 14px;">© 2024 Open Treatment. All rights reserved.</p>
            <p style="color: #666; margin: 0; font-size: 12px;">
              <a href="#" style="color: #667eea; text-decoration: none;">Privacy Policy</a> • 
              <a href="#" style="color: #667eea; text-decoration: none;">Terms of Service</a> • 
              <a href="#" style="color: #667eea; text-decoration: none;">Contact Us</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent successfully to ${email}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send OTP email");
  }
}