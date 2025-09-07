"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

interface UnlikeBlogInput {
  blogId: string;
}

export async function unlikeBlog({ blogId }: UnlikeBlogInput): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  // ✅ check if like exists
  const existing = await prisma.like.findUnique({
    where: {
      blogId_userId: {
        blogId,
        userId: user.id,
      },
    },
  });

  if (!existing) {
    throw new Error("You haven't liked this blog yet");
  }

  // ✅ remove like
  await prisma.like.delete({
    where: {
      blogId_userId: {
        blogId,
        userId: user.id,
      },
    },
  });

  // ✅ revalidate cache
  revalidatePath("/blog");
  revalidatePath(`/blog/${blogId}`);
}
