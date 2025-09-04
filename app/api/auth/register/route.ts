import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { generateOTP, sendOTPEmail } from "@/lib/email"; // You'll need to create these

export async function POST(req: Request) {
  try {
    const { email, password, confirmPassword, name, phone } = await req.json();

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Check if phone number already exists
    if (phone) {
      const existingPhone = await prisma.user.findUnique({ where: { phone } });
      if (existingPhone) {
        return NextResponse.json(
          { error: "Phone number already exists" },
          { status: 400 }
        );
      }
    }

    const hashed = await hash(password, 10);
    const otp = generateOTP(); // Generate 6-digit OTP
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
        phone,
        otp,
        otpExpiry,
      },
    });

    // Send OTP email
    await sendOTPEmail(email, otp);

    return NextResponse.json({
      message:
        "Registration successful. Please verify your email with the OTP sent to your inbox.",
      userId: user.id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
