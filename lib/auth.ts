// lib/auth.ts
import { getServerSession } from "next-auth";

export async function getCurrentUser() {
  const session = await getServerSession();
  if (!session?.user) return null;
  return session.user;
}
