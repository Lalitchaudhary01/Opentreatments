"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

interface RemoveTagInput {
  blogId: string;
  tagId: string;
}

export async function removeTag({
  blogId,
  tagId,
}: RemoveTagInput): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  // ✅ check blog exists & user is author
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    select: { id: true, authorId: true },
  });

  if (!blog) throw new Error("Blog not found");
  if (blog.authorId !== user.id) throw new Error("Forbidden");

  // ✅ disconnect tag from blog
  await prisma.blog.update({
    where: { id: blogId },
    data: {
      tags: {
        //@ts-ignore
        disconnect: { id: tagId },
      },
    },
  });

  // ✅ revalidate
  revalidatePath("/blog");
  revalidatePath(`/blog/${blogId}`);
}
