"use client";

import Link from "next/link";
import { Blog } from "../types/blog";

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  if (blogs.length === 0) {
    return <p>No blogs found.</p>;
  }

  return (
    <ul className="space-y-4">
      {blogs.map((blog) => (
        <li key={blog.id} className="border p-4 rounded-md shadow-sm">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>

          {/* 👇 Ye link user ko blog/[id] page pe le jayega */}
          <Link
            href={`/blog/${blog.id}`}
            className="text-blue-600 hover:underline"
          >
            Read More →
          </Link>
        </li>
      ))}
    </ul>
  );
}
