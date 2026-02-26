"use client"

export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded bg-gray-200"
        />
      ))}
    </div>
  )
}