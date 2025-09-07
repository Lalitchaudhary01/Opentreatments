"use server";

import prisma from "@/lib/prisma";
import { Blog } from "../types/blog";

export async function getBlogs(): Promise<Blog[]> {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc", // latest first
    },
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

  return blogs;
}
