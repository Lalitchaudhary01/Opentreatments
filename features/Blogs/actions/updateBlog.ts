"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { Blog } from "../types/blog";

interface UpdateBlogInput {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  image?: string;
}

export async function updateBlog(data: UpdateBlogInput): Promise<Blog> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // ✅ check ownership
  const existingBlog = await prisma.blog.findUnique({
    where: { id: data.id },
    select: { authorId: true },
  });

  if (!existingBlog) throw new Error("Blog not found");
  if (existingBlog.authorId !== user.id) throw new Error("Forbidden");

  // ✅ update blog
  const blog = await prisma.blog.update({
    where: { id: data.id },
    data: {
      title: data.title,
      content: data.content,
      image: data.image ?? null,
      tags: {
        // clear old tags before reassigning
        deleteMany: {},
        create: data.tags?.map((t) => ({
          tag: {
            connectOrCreate: {
              where: { name: t },
              create: { name: t },
            },
          },
        })),
      },
    },
    include: {
      author: true,
      tags: { include: { tag: true } },
      comments: { include: { author: true } },
      likes: { include: { user: true } },
    },
  });

  revalidatePath("/blog");
  // @ts-ignore
  return blog;
}
