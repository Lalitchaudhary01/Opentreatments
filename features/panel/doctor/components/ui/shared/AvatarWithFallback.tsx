"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarWithFallback({
  src,
  name,
  className,
}: {
  src?: string | null;
  name: string;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Avatar className={className}>
      <AvatarImage src={src || undefined} alt={name} />
      <AvatarFallback className="bg-[#00C6D2] text-white font-bold">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
