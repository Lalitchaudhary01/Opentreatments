"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function deleteBlog(id: string) {
  // ✅ Get current logged-in user
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  if (!id) throw new Error("Blog ID is required");

  // ✅ Check if the blog exists and ownership
  const existingBlog = await prisma.blog.findUnique({
    where: { id },
    select: { authorId: true },
  });

  if (!existingBlog) throw new Error("Blog not found");
  if (existingBlog.authorId !== user.id) {
    throw new Error("You are not allowed to delete this blog");
  }

  // ✅ Delete related rows first to avoid foreign key constraint error
  await prisma.blogTag.deleteMany({ where: { blogId: id } });
  await prisma.comment.deleteMany({ where: { blogId: id } });
  await prisma.like.deleteMany({ where: { blogId: id } });

  // ✅ Now delete the blog itself
  await prisma.blog.delete({ where: { id } });

  return { success: true };
}
