"use client";

import { Badge } from "@/components/ui/badge";

export default function LanguageBadges({ languages }: { languages: string[] }) {
  if (!languages || languages.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {languages.map((lang, i) => (
        <Badge
          key={i}
          className="bg-white text-[#00C6D2] border border-[#00C6D2] font-semibold"
        >
          {lang}
        </Badge>
      ))}
    </div>
  );
}
