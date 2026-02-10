"use client";

import Image from "next/image";
import { useState } from "react";

interface AvatarWithFallbackProps {
  src?: string | null;
  alt: string;
  size?: number;
  fallback?: string;
}

export default function AvatarWithFallback({
  src,
  alt,
  size = 40,
  fallback,
}: AvatarWithFallbackProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground"
        style={{ width: size, height: size }}
      >
        {fallback || alt.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      onError={() => setError(true)}
      className="rounded-full object-cover"
    />
  );
}
