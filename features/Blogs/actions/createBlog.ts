"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { Blog } from "../types/blog";

interface CreateBlogInput {
  title: string;
  content: string;
  tags?: string[]; // optional tags
  image?: string; // optional image URL
}

export async function createBlog(data: CreateBlogInput): Promise<Blog> {
  // ✅ Ensure the user is logged in
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // ✅ Create the blog in the database
  const blog = await prisma.blog.create({
    data: {
      title: data.title,
      content: data.content,
      image: data.image ?? null,
      authorId: user.id,
      tags: {
        //@ts-ignore
        connectOrCreate: data.tags?.map((t) => ({
          where: { name: t },
          create: { name: t },
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

  // ✅ Revalidate cache so /blog page updates immediately
  revalidatePath("/blog");
  //@ts-ignore
  return blog;
}
