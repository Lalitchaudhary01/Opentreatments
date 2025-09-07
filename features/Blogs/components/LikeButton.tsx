"use client";

import { useState } from "react";

interface LikeButtonProps {
  initialLiked: boolean;
  initialCount: number;
  onLike: () => Promise<void>;
  onUnlike: () => Promise<void>;
}

export default function LikeButton({
  initialLiked,
  initialCount,
  onLike,
  onUnlike,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  async function toggleLike() {
    if (liked) {
      await onUnlike();
      setLiked(false);
      setCount((c) => c - 1);
    } else {
      await onLike();
      setLiked(true);
      setCount((c) => c + 1);
    }
  }

  return (
    <button
      onClick={toggleLike}
      className={`px-3 py-1 rounded ${
        liked ? "bg-red-500 text-white" : "bg-gray-200"
      }`}
    >
      ❤️ {count}
    </button>
  );
}
