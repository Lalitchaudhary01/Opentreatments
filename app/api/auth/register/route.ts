import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, confirmPassword, name, phone } = await req.json();

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashed = await hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed, name },
  });

  return NextResponse.json(user);
}
