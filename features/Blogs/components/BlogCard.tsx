"use client";

import { Blog } from "../types/blog";
import { formatDate } from "../utils/formatDate";
import Link from "next/link";

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
      )}

      <h2 className="text-xl font-semibold mb-1">
        <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
      </h2>
      <p className="text-sm text-gray-500 mb-2">
        By {blog.author?.name || "Unknown"} · {formatDate(blog.createdAt)}
      </p>

      <p className="text-gray-700 line-clamp-3">{blog.content}</p>
    </div>
  );
}
