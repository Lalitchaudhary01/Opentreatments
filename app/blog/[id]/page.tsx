import { getBlogById } from "@/features/Blogs/actions/getBlogById";
import { likeBlog } from "@/features/Blogs/actions/likeBlog";
import { unlikeBlog } from "@/features/Blogs/actions/unlikeBlog";

import CommentList from "@/features/Blogs/components/CommentList";
import LikeButton from "@/features/Blogs/components/LikeButton";

interface BlogDetailsProps {
  params: { id: string };
}

export default async function BlogDetailsPage({ params }: BlogDetailsProps) {
  const blog = await getBlogById(params.id);

  if (!blog) return <p>Blog not found</p>;

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-md"
        />
      )}
      <p>{blog.content}</p>

      {/* Like Button */}
      <LikeButton
        blogId={blog.id}
        initialLiked={blog.likes.some(
          (like) => like.user.id === blog.author.id
        )}
        initialCount={blog.likes.length}
      />

      {/* Comments */}
      <section>
        <h2 className="text-xl font-semibold mt-4">Comments</h2>
        <CommentList comments={blog.comments} />
      </section>
    </main>
  );
}
