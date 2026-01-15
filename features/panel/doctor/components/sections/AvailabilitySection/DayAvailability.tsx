"use client";

import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DayAvailability({
  day,
  time,
}: {
  day: string;
  time?: string;
}) {
  const isAvailable = Boolean(time);

  return (
    <div
      className={`border-2 rounded-xl p-3 transition-all ${
        isAvailable
          ? "border-[#00C6D2]/30 bg-gradient-to-r from-[#00C6D2]/10 to-teal-500/10"
          : "border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/20"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full ${
              isAvailable ? "bg-[#00C6D2]" : "bg-gray-300 dark:bg-gray-600"
            }`}
          />
          <span
            className={`font-bold capitalize ${
              isAvailable
                ? "text-foreground"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            {day}
          </span>
        </div>

        {isAvailable ? (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#00C6D2]" />
            <span className="text-sm font-semibold text-[#00C6D2]">{time}</span>
          </div>
        ) : (
          <Badge className="bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
            Unavailable
          </Badge>
        )}
      </div>
    </div>
  );
}
