"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

interface DeleteBlogInput {
  id: string;
}

export async function deleteBlog({ id }: DeleteBlogInput): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  // ✅ check ownership
  const existingBlog = await prisma.blog.findUnique({
    where: { id },
    select: { authorId: true },
  });

  if (!existingBlog) throw new Error("Blog not found");
  if (existingBlog.authorId !== user.id) throw new Error("Forbidden");

  // ✅ delete blog
  await prisma.blog.delete({
    where: { id },
  });

  // ✅ revalidate cache
  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`);
}
