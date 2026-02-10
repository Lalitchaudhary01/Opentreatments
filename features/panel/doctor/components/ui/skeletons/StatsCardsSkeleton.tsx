"use client";

export default function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-28 w-full rounded-2xl bg-muted" />
      ))}
    </div>
  );
}
