"use client";

import { getBlogById } from "@/features/Blogs/actions/getBlogById";
import { updateBlog } from "@/features/Blogs/actions/updateBlog";
import BlogForm from "@/features/Blogs/components/BlogForm";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

interface EditBlogProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPage({ params }: EditBlogProps) {
  const router = useRouter();
  const { id } = use(params); // ✅ unwrap params here

  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    async function fetchBlog() {
      const data = await getBlogById(id);
      setBlog(data);
    }
    fetchBlog();
  }, [id]);

  async function handleUpdate(data: {
    title: string;
    content: string;
    image?: string;
    tags?: string[];
  }) {
    await updateBlog({ id, ...data });
    router.push(`/blog/${id}`);
  }

  if (!blog) return <p>Loading...</p>;

  return (
    <BlogForm
      initialData={{
        title: blog.title,
        content: blog.content,
        image: blog.image,
        tags: blog.tags.map((t: any) => t.tag.name),
      }}
      onSubmit={handleUpdate}
      isEditing={true}
    />
  );
}
