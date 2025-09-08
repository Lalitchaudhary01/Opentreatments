"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
}

export async function updateUser(input: UpdateUserInput) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const { id, ...data } = input;

  const updatedUser = await prisma.user.update({
    where: { id },
    data,
  });

  return {
    id: updatedUser.id,
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
    // image: updatedUser.image,
  };
}
