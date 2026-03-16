import nodemailer from "nodemailer";
import path from "path";

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTPEmail(email: string, otp: string): Promise<void> {
  const logoCid = "open-treatment-logo";
  const logoPath = path.join(process.cwd(), "public", "logo.png");

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
    subject: "Verify your email - Open Treatment",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify your email</title>
      </head>
      <body style="margin:0;padding:0;background:#020817;font-family:Arial,'Segoe UI',sans-serif;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:radial-gradient(circle at top,#0b1736 0%,#020817 60%);padding:28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#040d25;border:1px solid #1e293b;border-radius:18px;overflow:hidden;">
                <tr>
                  <td style="padding:28px 24px;background:linear-gradient(90deg,#0f172a 0%,#0b1f4d 70%,#093b71 100%);border-bottom:1px solid #1f2f52;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="56" valign="middle">
                          <img src="cid:${logoCid}" alt="Open Treatment" width="42" height="42" style="display:block;border:0;outline:none;text-decoration:none;">
                        </td>
                        <td valign="middle">
                          <p style="margin:0;color:#e2e8f0;font-size:21px;font-weight:700;letter-spacing:0.2px;">Open Treatment</p>
                          <p style="margin:4px 0 0;color:#93c5fd;font-size:12px;">Doctor • Pharmacy • Healthcare CRM</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:30px 24px 10px;">
                    <p style="margin:0;color:#f8fafc;font-size:26px;line-height:1.25;font-weight:800;">Verify your email</p>
                    <p style="margin:10px 0 0;color:#94a3b8;font-size:14px;line-height:1.65;">
                      Use the code below to continue your Open Treatment signup/login flow.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:18px 24px 12px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:linear-gradient(90deg,#0b2a66 0%,#0e7490 100%);border-radius:14px;">
                      <tr>
                        <td align="center" style="padding:22px 14px;">
                          <p style="margin:0;color:#e2e8f0;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;">One-time verification code</p>
                          <p style="margin:10px 0 0;color:#ffffff;font-size:40px;line-height:1;font-weight:800;letter-spacing:10px;font-family:'Courier New',monospace;">${otp}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:6px 24px 0;">
                    <div style="display:inline-block;background:#0f172a;border:1px solid #1e293b;border-radius:999px;padding:8px 14px;color:#93c5fd;font-size:12px;">
                      Code expires in 15 minutes
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#020817;border:1px solid #1e293b;border-radius:12px;">
                      <tr>
                        <td style="padding:14px 16px;">
                          <p style="margin:0 0 8px;color:#e2e8f0;font-size:13px;font-weight:700;">Security note</p>
                          <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
                            Never share this OTP with anyone. Open Treatment support will never ask your OTP or password.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 24px 26px;">
                    <p style="margin:0;color:#64748b;font-size:12px;">
                      If you did not request this code, you can ignore this email.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:16px 24px;border-top:1px solid #1e293b;background:#020617;">
                    <p style="margin:0;color:#64748b;font-size:11px;line-height:1.6;">
                      © ${new Date().getFullYear()} Open Treatment. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    attachments: [
      {
        filename: "logo.png",
        path: logoPath,
        cid: logoCid,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent successfully to ${email}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw new Error("Failed to send OTP email");
  }
}
