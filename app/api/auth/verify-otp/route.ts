import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

const NEXT_PATH_BY_ROLE: Record<Role, string> = {
  USER: "/",
  ADMIN: "/admin/dashbaord",
  DOCTOR: "/doctor/profile/submit",
  HOSPITAL: "/auth?mode=hospital-details&role=HOSPITAL",
  PHARMACY: "/pharmacy/profile/submit",
  LABORATORY: "/auth?mode=lab-details&role=LABORATORY",
  INSURANCE_COMPANY: "/insurance/profile/submit",
};

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

    return NextResponse.json({
      message: "Email verified successfully",
      role: user.role,
      nextPath: NEXT_PATH_BY_ROLE[user.role],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
