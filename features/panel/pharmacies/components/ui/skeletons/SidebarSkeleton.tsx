"use client"

export function SidebarSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-6 w-32 animate-pulse rounded bg-gray-200"
        />
      ))}
    </div>
  )
}