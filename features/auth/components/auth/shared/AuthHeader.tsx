"use client";

import type { AuthHeaderProps } from "./types";

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="text-center mb-6">
      <div className="flex justify-center items-center mb-4">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-cyan-500">Open</span>
          <span className="text-teal-500">Treatment</span>
        </div>
      </div>

      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
        {title}
      </h1>

      {subtitle && (
        <p className="text-cyan-600 font-semibold mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
