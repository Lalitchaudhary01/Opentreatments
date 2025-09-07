"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { Like } from "../types/like";

interface LikeBlogInput {
  blogId: string;
}

export async function likeBlog({ blogId }: LikeBlogInput): Promise<Like> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  // ✅ Prevent duplicate likes
  const existing = await prisma.like.findUnique({
    where: {
      blogId_userId: {
        blogId,
        userId: user.id,
      },
    },
  });

  if (existing) {
    throw new Error("You already liked this blog");
  }

  // ✅ Create new like
  const like = await prisma.like.create({
    data: {
      blogId,
      userId: user.id,
    },
    include: {
      user: true,
      blog: true,
    },
  });

  // ✅ revalidate
  revalidatePath("/blog");
  revalidatePath(`/blog/${blogId}`);

  return like;
}
