"use client";

import { useState } from "react";

interface BlogFormProps {
  initialData?: {
    title: string;
    content: string;
    image?: string | null;
    tags?: string[];
  };
  onSubmit: (data: {
    title: string;
    content: string;
    image?: string;
    tags?: string[];
  }) => Promise<void>;
}

export default function BlogForm({ initialData, onSubmit }: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit({
      title,
      content,
      image,
      tags: tags.split(",").map((t) => t.trim()),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
        type="text"
        placeholder="Title"
        className="w-full border rounded p-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        className="w-full border rounded p-2 min-h-[150px]"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL"
        className="w-full border rounded p-2"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full border rounded p-2"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
}
