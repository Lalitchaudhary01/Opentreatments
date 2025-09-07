"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

interface DeleteCommentInput {
  commentId: string;
}

export async function deleteComment({
  commentId,
}: DeleteCommentInput): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  // ✅ get comment details
  const existing = await prisma.comment.findUnique({
    where: { id: commentId },
    select: {
      id: true,
      userId: true,
      blogId: true,
    },
  });

  if (!existing) throw new Error("Comment not found");

  // ✅ only comment author OR blog author can delete
  const blog = await prisma.blog.findUnique({
    where: { id: existing.blogId },
    select: { authorId: true },
  });

  if (existing.userId !== user.id && blog?.authorId !== user.id) {
    throw new Error("Forbidden");
  }

  // ✅ delete comment
  await prisma.comment.delete({
    where: { id: commentId },
  });

  // ✅ revalidate
  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.blogId}`);
}
