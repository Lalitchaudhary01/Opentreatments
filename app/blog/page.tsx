export const dynamic = "force-dynamic";

import { getBlogs } from "@/features/Blogs/actions/getBlog";
import BlogList from "@/features/Blogs/components/BlogList";

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
      <BlogList blogs={blogs} />
    </main>
  );
}
