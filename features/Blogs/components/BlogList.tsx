import { Blog } from "../types/blog";
import BlogCard from "./BlogCard";

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  if (blogs.length === 0) return <p>No blogs found.</p>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
