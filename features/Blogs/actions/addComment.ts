"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { Comment } from "../types/comment";

interface AddCommentInput {
  blogId: string;
  content: string;
}

export async function addComment({
  blogId,
  content,
}: AddCommentInput): Promise<Comment> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  if (!content.trim()) throw new Error("Comment cannot be empty");

  // ✅ create comment
  const comment = await prisma.comment.create({
    data: {
      content,
      blogId,
      userId: user.id,
    },
    include: {
      author: true,
      blog: true,
    },
  });

  // ✅ revalidate
  revalidatePath("/blog");
  revalidatePath(`/blog/${blogId}`);

  return comment;
}
