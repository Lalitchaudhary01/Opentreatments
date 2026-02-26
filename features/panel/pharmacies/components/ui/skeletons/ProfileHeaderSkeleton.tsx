"use client"

export function ProfileHeaderSkeleton() {
  return (
    <div className="space-y-2 p-4">
      <div className="h-6 w-48 animate-pulse rounded bg-gray-200" />
      <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
    </div>
  )
}