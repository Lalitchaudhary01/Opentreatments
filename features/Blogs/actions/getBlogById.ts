"use server";

import prisma from "@/lib/prisma";
import { Blog } from "../types/blog";

export async function getBlogById(id: string): Promise<Blog | null> {
  if (!id) throw new Error("Blog ID is required");

  const blog = await prisma.blog.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      likes: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  return blog;
}
