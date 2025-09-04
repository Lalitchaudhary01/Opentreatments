import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (user.otpExpiry && user.otpExpiry < new Date()) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    // Update user as verified and clear OTP
    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        otp: null,
        otpExpiry: null,
      },
    });

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
