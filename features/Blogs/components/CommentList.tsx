import { Comment } from "../types/comment";
import { formatDate } from "../utils/formatDate";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) return <p>No comments yet.</p>;

  return (
    <ul className="space-y-3">
      {comments.map((c) => (
        <li key={c.id} className="border-b pb-2">
          <p className="text-sm">{c.content}</p>
          <span className="text-xs text-gray-500">
            By {c.author?.name || "Anonymous"} · {formatDate(c.createdAt)}
          </span>
        </li>
      ))}
    </ul>
  );
}
