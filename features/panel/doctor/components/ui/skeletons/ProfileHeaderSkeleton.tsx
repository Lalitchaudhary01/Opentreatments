"use client";

export default function ProfileHeaderSkeleton() {
  return (
    <div className="flex gap-8 p-6">
      <div className="h-40 w-40 bg-muted rounded-full" />
      <div className="flex-1 space-y-4">
        <div className="h-8 w-64 bg-muted rounded" />
        <div className="h-6 w-48 bg-muted rounded" />
        <div className="flex gap-4">
          <div className="h-5 w-24 bg-muted rounded" />
          <div className="h-5 w-24 bg-muted rounded" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-40 bg-muted rounded" />
          <div className="h-10 w-40 bg-muted rounded" />
        </div>
      </div>
    </div>
  );
}
