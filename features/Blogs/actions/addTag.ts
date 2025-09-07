"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";

interface AddTagInput {
  blogId: string;
  tagName: string;
}

export async function addTag({ blogId, tagName }: AddTagInput): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  // ✅ check blog exists & user is author
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    select: { id: true, authorId: true },
  });

  if (!blog) throw new Error("Blog not found");
  if (blog.authorId !== user.id) throw new Error("Forbidden");

  // ✅ check if tag already exists
  let tag = await prisma.tag.findUnique({
    where: { name: tagName },
  });

  // ✅ create tag if not exists
  if (!tag) {
    tag = await prisma.tag.create({
      data: { name: tagName },
    });
  }

  // ✅ link tag with blog (avoid duplicates)
  await prisma.blog.update({
    where: { id: blogId },
    data: {
      tags: {
        //@ts-ignore
        connect: { id: tag.id },
      },
    },
  });

  // ✅ revalidate
  revalidatePath("/blog");
  revalidatePath(`/blog/${blogId}`);
}
