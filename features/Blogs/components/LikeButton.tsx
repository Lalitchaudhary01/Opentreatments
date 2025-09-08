"use client";

import { useState, useTransition } from "react";
import { likeBlog } from "../actions/likeBlog";
import { unlikeBlog } from "../actions/unlikeBlog";

interface LikeButtonProps {
  blogId: string;
  initialLiked: boolean;
  initialCount: number;
}

export default function LikeButton({
  blogId,
  initialLiked,
  initialCount,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  async function toggleLike() {
    startTransition(async () => {
      if (liked) {
        await unlikeBlog({ blogId });
        setLiked(false);
        setCount((c) => c - 1);
      } else {
        await likeBlog({ blogId });
        setLiked(true);
        setCount((c) => c + 1);
      }
    });
  }

  return (
    <button
      onClick={toggleLike}
      disabled={isPending}
      className={`px-3 py-1 rounded ${
        liked ? "bg-red-500 text-white" : "bg-gray-200"
      }`}
    >
      ❤️ {count}
    </button>
  );
}
