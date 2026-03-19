import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { Prisma, Role } from "@prisma/client";
import { generateOTP, sendOTPEmail } from "@/lib/email"; // You'll need to create these

function parseRole(value: unknown): Role | null {
  if (
    value === "USER" ||
    value === "DOCTOR" ||
    value === "ADMIN" ||
    value === "HOSPITAL" ||
    value === "PHARMACY" ||
    value === "LABORATORY" ||
    value === "INSURANCE_COMPANY"
  ) {
    return value as Role;
  }
  return null;
}

export async function POST(req: Request) {
  try {
    const { email, password, confirmPassword, name, phone, role } =
      await req.json();

    const parsedRole = parseRole(role);
    if (!parsedRole) {
      return NextResponse.json(
        { error: "Please select a valid role" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const [existingUser, existingPhone] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      phone ? prisma.user.findUnique({ where: { phone } }) : Promise.resolve(null),
    ]);

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    if (existingPhone) {
      return NextResponse.json(
        { error: "Phone number already exists" },
        { status: 400 }
      );
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
        role: parsedRole,
      },
    });

    // Send OTP in background to reduce API response latency.
    void sendOTPEmail(email, otp).catch((mailErr) => {
      console.error("Failed to send registration OTP email:", mailErr);
    });

    return NextResponse.json({
      message:
        "Registration successful. Please verify your email with the OTP sent to your inbox.",
      userId: user.id,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientValidationError &&
      error.message.includes("Invalid value for argument `role`")
    ) {
      return NextResponse.json(
        {
          error:
            "Role enum is stale in running dev server. Stop dev server and run: npx prisma generate --schema=./prisma, then npm run dev",
        },
        { status: 500 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
