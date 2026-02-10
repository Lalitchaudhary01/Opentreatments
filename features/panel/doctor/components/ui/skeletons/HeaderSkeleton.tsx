"use client";

export default function HeaderSkeleton() {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="h-10 w-64 bg-muted rounded" />
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-muted rounded-full" />
        <div className="h-10 w-10 bg-muted rounded-full" />
      </div>
    </div>
  );
}
