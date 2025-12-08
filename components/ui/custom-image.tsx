// components/ui/custom-image.tsx
"use client";

import { useState } from "react";

interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackSrc?: string;
}

export default function CustomImage({
  src,
  alt,
  width,
  height,
  className = "",
  fallbackSrc = "/default-avatar.png",
}: CustomImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
}
