"use client";

import { createBlog } from "@/features/Blogs/actions/createBlog";
import BlogForm from "@/features/Blogs/components/BlogForm";
import { useRouter } from "next/navigation";

export default function CreateBlogPag() {
  const router = useRouter();

  async function handleCreate(data: {
    title: string;
    content: string;
    image?: string;
    tags?: string[];
  }) {
    await createBlog(data);
    router.push("/blog");
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <BlogForm onSubmit={handleCreate} />
    </main>
  );
}
