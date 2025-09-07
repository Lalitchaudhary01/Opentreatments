"use client";

import { getBlogById } from "@/features/Blogs/actions/getBlogById";
import { updateBlog } from "@/features/Blogs/actions/updateBlog";
import BlogForm from "@/features/Blogs/components/BlogForm";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface EditBlogProps {
  params: { id: string };
}

export default function EditBlogPage({ params }: EditBlogProps) {
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    async function fetchBlog() {
      const data = await getBlogById(params.id);
      setBlog(data);
    }
    fetchBlog();
  }, [params.id]);

  async function handleUpdate(data: {
    title: string;
    content: string;
    image?: string;
    tags?: string[];
  }) {
    await updateBlog({ id: params.id, ...data });
    router.push(`/blog/${params.id}`);
  }

  if (!blog) return <p>Loading...</p>;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
      <BlogForm
        initialData={{
          title: blog.title,
          content: blog.content,
          image: blog.image,
          tags: blog.tags.map((t: any) => t.tag.name),
        }}
        onSubmit={handleUpdate}
      />
    </main>
  );
}
