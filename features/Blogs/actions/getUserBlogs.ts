"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// ✅ Server Action: Logged-in user ke blogs fetch karega
export async function getUserBlogs() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized"); // agar user login nahi hai
  }

  const blogs = await prisma.blog.findMany({
    where: {
      authorId: user.id, // sirf us user ke blogs
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      tags: {
        include: {
          tag: true,
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
    },
    orderBy: {
      createdAt: "desc", // latest blogs first
    },
  });

  return blogs;
}
