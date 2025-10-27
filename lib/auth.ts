// lib/auth.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import prisma from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  // fetch full user from DB using email
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  return user; // <- includes id, email, etc.
}
